import { Card, Typography } from "@mui/material";
import { useState } from "react";
import Chart from "react-apexcharts";

import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface TeaCollection {
  collectedDate: string;
  totalKg: number;
  minusKg: number;
  subTotalKg: number;
}

// Utility: Group data by month
const groupByMonth = (data: TeaCollection[]) => {
  return data.reduce((acc: any, item) => {
    const month = new Date(item.collectedDate).toLocaleString("default", { month: "long" });
    if (!acc[month]) acc[month] = [];
    acc[month].push(item);
    return acc;
  }, {});
};


const TeaMonthlyDashboard = () => {
    const [monthlyData] = useState([
        { month: "January", totalCollection: 1200, totalMinus: 100, totalEntries: 15 },
        { month: "February", totalCollection: 1100, totalMinus: 80, totalEntries: 12 },
        { month: "March", totalCollection: 1300, totalMinus: 90, totalEntries: 18 },
    ]);
    
      const [data] = useState<TeaCollection[]>([
        { collectedDate: "2023-01-05", totalKg: 100, minusKg: 5, subTotalKg: 95 },
        { collectedDate: "2023-01-15", totalKg: 150, minusKg: 10, subTotalKg: 140 },
        { collectedDate: "2023-02-10", totalKg: 200, minusKg: 15, subTotalKg: 185 },
        { collectedDate: "2023-02-20", totalKg: 250, minusKg: 20, subTotalKg: 230 },
  ]);

  const monthlyGroups = groupByMonth(data);

  const months = monthlyData.map(m => m.month);
  const totalKg = monthlyData.map(m => m.totalCollection);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        🍃 Tea Collection Dashboard (Monthly)
      </Typography>

      {/* Total Monthly Collection Chart */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Chart
          type="bar"
          height={400}
          series={[{ name: "Total Kg", data: totalKg }]}
          options={{
            chart: { id: "tea-monthly" },
            xaxis: { categories: months },
            dataLabels: { enabled: true },
            title: { text: "Monthly Tea Collection (Kg)" }
          }}
        />
      </Card>

      {/* Monthly Summary Table */}
      <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        🍃 Monthly Tea Collection Dashboard
      </Typography>

      {Object.keys(monthlyGroups).map((month) => {
        const monthData:any = monthlyGroups[month];
        const totalKg = monthData.reduce((sum:any, row:any) => sum + row.totalKg, 0);
        const totalMinus = monthData.reduce((sum:any, row:any) => sum + row.minusKg, 0);
        const totalSubTotal = monthData.reduce((sum:any, row:any) => sum + row.subTotalKg, 0);

        return (
          <Card key={month} sx={{ mb: 4, p: 2 }}>
            <Typography
              variant="h6"
              sx={{
                background: "#000",
                color: "#fff",
                px: 2,
                py: 1,
                borderRadius: 1,
                display: "inline-block",
                mb: 2,
              }}
            >
              ✅ {month}
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Total Kg</strong></TableCell>
                  <TableCell><strong>Minus Kg</strong></TableCell>
                  <TableCell><strong>Sub Total Kg</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {monthData.map((row:any, idx:any) => (
                  <TableRow key={idx}>
                    <TableCell>{row.collectedDate}</TableCell>
                    <TableCell>{row.totalKg}</TableCell>
                    <TableCell>{row.minusKg}</TableCell>
                    <TableCell>{row.subTotalKg}</TableCell>
                  </TableRow>
                ))}

                {/* ✅ Monthly Total Row */}
                <TableRow sx={{ background: "#f5f5f5" }}>
                  <TableCell><strong>Total for {month}</strong></TableCell>
                  <TableCell><strong>{totalKg}</strong></TableCell>
                  <TableCell><strong>{totalMinus}</strong></TableCell>
                  <TableCell><strong>{totalSubTotal}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        );
      })}
    </Box>
    </div>
  );
};

export default TeaMonthlyDashboard;
