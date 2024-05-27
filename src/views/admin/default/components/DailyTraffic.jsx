import BarChart from "components/charts/BarChart";
import { barChartDataDailyTraffic } from "variables/charts";
import { barChartOptionsDailyTraffic } from "variables/charts";
import Card from "components/card";
const DailyTraffic = () => {
  return (
    <Card extra="">

      <div className="h-[250px] w-full">
        <BarChart
          chartData={barChartDataDailyTraffic}
          chartOptions={barChartOptionsDailyTraffic}
        />
      </div>
    </Card>
  );
};

export default DailyTraffic;
