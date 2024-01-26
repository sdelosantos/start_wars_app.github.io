import { useEffect, useState } from 'react';
import usePlanetsQuery from '../../../core/hooks/usePlanetsQuery';
import { Planet, PlanetResponseData } from '../../../core/constants/types';
import { applySuspenseLoading } from '../../../components/HOC';
import { formatDateToString, parseToDecimal } from '../../../core/utils/format';
import DataTable, { ColumnName } from '../../../components/DataTable/DataTable';

type PlanetTableProps = {
  search?: string;
  onDataLoaded?: (data: PlanetResponseData) => void;
};

const PlanetsTable = applySuspenseLoading<PlanetTableProps>(
  ({ onDataLoaded }) => {
    const planetsQuery = usePlanetsQuery();
    const [listPlanets, setListPlanets] = useState<Planet[]>([]);

    useEffect(() => {
      if (planetsQuery.isFetched) {
        onDataLoaded?.(planetsQuery.data);
        const planets = planetsQuery.data?.results ?? [];
        setListPlanets(planets);
      }
    }, [onDataLoaded, planetsQuery]);

    return (
      <DataTable data={listPlanets}>
        <ColumnName label='Planet Name' name='name' />
        <ColumnName label='Terrain' name='terrain' />
        <ColumnName label='Climate' name='climate' />
        <ColumnName label='Gravity' name='gravity' />
        <ColumnName
          label='Population'
          name='population'
          format={(value) => parseToDecimal(value)}
        />
        <ColumnName
          label='Created'
          name='created'
          format={(value) => formatDateToString(value)}
        />
      </DataTable>
    );
  }
);

export default PlanetsTable;
