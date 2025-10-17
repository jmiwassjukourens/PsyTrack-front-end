import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { reportsService } from "../../services/reportsService";
import ReportsYearFilter from "../../components/Reports/ReportsYearFilter";
import styles from "./ReportsAnualPage.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

export default function ReportsAnualPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    setReportData(reportsService.getAnualReport(year));
  }, [year]);

  if (!reportData) return <p>Cargando...</p>;

  const months = reportData.monthlyData.map(d => d.month);

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Cobrado",
        data: reportData.monthlyData.map(d => d.collectedIncome),
        backgroundColor: "#4CAF50",
      },
      {
        label: "Pendiente",
        data: reportData.monthlyData.map(d => d.pendingIncome),
        backgroundColor: "#EF5350",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: `Ingresos ${year}`, color: "#333" },
    },
    scales: {
      x: { stacked: true, ticks: { color: "#444" } },
      y: { stacked: true, ticks: { color: "#444" } },
    },
  };

  const totalCollected = reportData.monthlyData.reduce((acc, d) => acc + d.collectedIncome, 0);
  const totalPending = reportData.monthlyData.reduce((acc, d) => acc + d.pendingIncome, 0);
  const totalIncome = totalCollected + totalPending;

  const pieData = {
    labels: ["Cobrado", "Pendiente"],
    datasets: [
      {
        data: [totalCollected, totalPending],
        backgroundColor: ["#4CAF50", "#EF5350"],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reporte Anual</h2>
      <ReportsYearFilter displayedYear={year} onChangeYear={setYear} />

      <div className={styles.summary}>
        <div className={styles.card}>
          <h3>Total</h3>
          <p>${totalIncome}</p>
        </div>
        <div className={styles.card}>
          <h3>Cobrado</h3>
          <p>${totalCollected}</p>
        </div>
        <div className={styles.card}>
          <h3>Pendiente</h3>
          <p>${totalPending}</p>
        </div>
      </div>

      <div className={styles.charts}>
        <div className={`${styles.chart} ${styles.barChart}`}>
          <Bar data={barData} options={barOptions} />
        </div>
        <div className={`${styles.chart} ${styles.pieChart}`}>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}
