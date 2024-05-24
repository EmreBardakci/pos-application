import { useState, useEffect } from "react";
import Header from "../components/header/Header.jsx";
import StatisticCard from "../components/statistics/StatisticCard.jsx";
import { Spin } from "antd";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const StatisticPage = () => {
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("posUser"));

  useEffect(() => {
    asyncFetch();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/products/get-all"
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const asyncFetch = () => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)}₺`;
  };

  const lineChartData = {
    labels: data?.map((item) => item.customerName),
    datasets: [
      {
        label: "SubTotal",
        data: data?.map((item) => item.subTotal),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const pieChartData = {
    labels: data?.map((item) => item.customerName),
    datasets: [
      {
        data: data?.map((item) => item.subTotal),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const pieChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: "black",
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex];
        },
        font: {
          weight: "bold",
          size: 14,
        },
        textAlign: "center",
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "black",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">İstatistiklerim</h1>
      {data ? (
        <div className="px-6 md:pb-0 pb-20">
          <div className="statistic-section">
            <h2 className="text-lg">
              Hoş geldin{" "}
              <span className="text-green-700 font-bold text-xl">
                {user.username}
              </span>
              .
            </h2>
            <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
              <StatisticCard
                title={"Toplam Müşteri"}
                amount={data?.length}
                img={"images/user.png"}
              />
              <StatisticCard
                title={"Toplam Kazanç"}
                amount={totalAmount()}
                img={"images/money.png"}
              />
              <StatisticCard
                title={"Toplam Satış"}
                amount={data?.length}
                img={"images/sale.png"}
              />
              <StatisticCard
                title={"Toplam Ürün"}
                amount={products?.length}
                img={"images/product.png"}
              />
            </div>
            <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
              <div className="lg:w-1/2 lg:h-80 h-80">
                <Line data={lineChartData} />
              </div>
              <div className="flex justify-center items-center w-full">
                <div className="w-full max-w-lg h-96">
                  <Pie
                    data={pieChartData}
                    options={pieChartOptions}
                    plugins={[ChartDataLabels]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </>
  );
};

export default StatisticPage;
