import './App.css';
import React, { useState, useEffect } from "react";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js';

import {CategoryScale} from 'chart.js'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

Chart.register(CategoryScale);
Chart.register(ArcElement);
function App() {

  const selectBranch = [
    { label: 'Athulya Homecare Chennai', value: 'Athulya Homecare Chennai' },
    { label: 'Athulya Homecare Bangalore', value: 'Athulya Homecare Bangalore' },
    { label: 'Athulya Homecare Cochin', value: 'Athulya Homecare Cochin' },
    { label: 'Athulya Homecare Hyderabad', value: 'Athulya Homecare Hyderabad' },
    { label: 'Athulya Homecare Coimbatore', value: 'Athulya Homecare Coimbatore' },
  
  ];
  
  const selectDayorMonth = [
    { label: 'Day', value: 'Day' },
    { label: 'Month', value: 'Month' }
  
  ];
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleFromDate = (date) => {
    setFromDate(date);
  };
  const handleToDate=(date)=>{
    setToDate(date);
  }
  
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    cutoutPercentage: 70, // Adjust this value to control the donut size
    legend: {
      position: 'center', // Position the legend to the right of the chart
    },
      responsive: true,
      maintainAspectRatio: false,

  };
  
  const [selectedData, setSelectedData] = useState('data1');

  const data1 = [
    { name: 'A',  pv: 2400 },
    { name: 'B',  pv: 1398 },
    { name: 'C', pv: 9800},
    { name: 'D',  pv: 3908 },
    { name: 'E',  pv: 4800 },
    { name: 'F',  pv: 3800},
    { name: 'G', pv: 4300 },
  ];

  return (
    <div className="App">
       
      <div class="mx-auto container-fluid grid grid-cols-8 border-solid border-2 border-sky-500">
        
         
        <div className='col-span-1  border-solid border-2 border-sky-500'>

              <div class="flex items-center justify-center h-14 border-b">
                <div>Athulya Homecare</div>
              </div>
              <div class="overflow-y-auto overflow-x-hidden flex-grow">
                <ul class="flex flex-col py-4 space-y-1">
                  <li class="px-5">
                    <div class="flex flex-row items-center h-8">
                      <div class="text-sm font-light tracking-wide text-gray-500">Menu</div>
                    </div>
                  </li>
                  <li>
                    <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                      <span class="inline-flex justify-center items-center ml-4">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                      </span>
                      <span class="ml-2 text-sm tracking-wide truncate">Dashboard</span>
                    </a>
                  </li>
                 
                  <li class="px-5">
                    <div class="flex flex-row items-center h-8">
                      <div class="text-sm font-light tracking-wide text-gray-500">Settings</div>
                    </div>
                  </li>
                  <li>
                    <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                      <span class="inline-flex justify-center items-center ml-4">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                      </span>
                      <span class="ml-2 text-sm tracking-wide truncate">Profile</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                      <span class="inline-flex justify-center items-center ml-4">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </span>
                      <span class="ml-2 text-sm tracking-wide truncate">Settings</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                      <span class="inline-flex justify-center items-center ml-4">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                      </span>
                      <span class="ml-2 text-sm tracking-wide truncate">Logout</span>
                    </a>
                  </li>
                </ul>
              </div>
            
          
       
          
        </div>
        
        <div className='col-span-7 grid grid-cols-7  bg-[#F3F4F6] border-solid border-2 border-sky-500'>
          <header class="col-span-7 h-16 bg-[#F3F4F6] border-solid border-2 border-sky-500">
              <h1 class="text-center text-2xl"></h1>
          </header>
          <main class="col-span-7 md:col-span-7  p-10 bg-[#F3F4F6] border-2 border-sky-500">
            {/* Filters */}
              <div className="grid lg:grid-cols-5 gap-5 mb-16 border-solid border-2 border-sky-500">
                <div className="rounded bg-white h-10 shadow-sm border-solid border-2 border-sky-500">
                  <Select
                    options={selectBranch}
                    name="branch_name"
                    className="branch_name"
                    placeholder="Select Branch"
                
                  />
                    
                </div>
                <div className="rounded bg-white h-10 shadow-sm border-solid border-2 border-sky-500">
                <Select
                    options={selectDayorMonth}
                    name="day_or_month"
                    className="day_or_month"
                    placeholder="Day/Month"
                
                  />
                </div>
                <div className="rounded bg-white h-10 shadow-sm border-solid border-2 border-sky-500 w-full">
                
                  
                    <DatePicker
                      selected={fromDate}
                      onChange={handleFromDate}
                      className="border border-gray-300 h-9 rounded-md  px-2 outline-none w-full"
                      placeholderText="From Date"
                    />

                    
                  
                
                
                </div>
                <div className="rounded bg-white h-10 shadow-sm border-solid border-2 border-sky-500">
                <DatePicker
                      selected={toDate}
                      onChange={handleToDate}
                      className="border border-gray-300 h-9 rounded-md  px-2 outline-none w-full"
                      placeholderText="To Date"
                    />

                </div>
                <div className="rounded bg-white h-10 shadow-sm border-solid border-2 border-sky-500">
                <button class=" hover:bg-blue-700 text-white font-semibold hover:text-white h-full w-full bg-blue-500 border border-blue-500 hover:border-transparent rounded">
                  Button
                </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-5 mb-16 border-solid border-2 border-sky-500">
                <div className="rounded bg-white shadow-sm border-solid border-2 border-sky-500">
                  <div class="flex items-center p-5 bg-white shadow rounded-lg">
                    <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <span class="block text-2xl font-bold">25,000</span>
                      <span class="block text-gray-500">Today Income</span>
                    </div>
                  </div>
                </div>
                <div className="rounded bg-white  shadow-sm border-solid border-2 border-sky-500">

                  <div class="flex items-center p-5 bg-white shadow rounded-lg">
                    <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <span class="block text-2xl font-bold">1,50,000</span>
                      <span class="block text-gray-500">Actual Income</span>
                    </div>
                  </div>

                </div>

                <div className="rounded bg-white  shadow-sm border-solid border-2 border-sky-500">

                  <div class="flex items-center p-5 bg-white shadow rounded-lg">
                    <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <span class="block text-2xl font-bold">10,00000</span>
                      <span class="block text-gray-500">Income Received</span>
                    </div>
                  </div>

                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-5 mb-16 border-solid border-2 border-sky-500">
                
                <div className="grid lg:grid-cols-2  rounded bg-white  shadow-sm border-solid border-2 border-sky-500">
                   
                   <div className='col-span-1 flex justify-center p-10 border-solid border-2 border-sky-500'>
                    
                      <Doughnut data={data} options={options} />
                   </div>
                   <div className='col-span-1 border-solid border-2 p-10 border-sky-500'>
                        {data.labels.map((label, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div
                                className="w-4 h-4"
                                style={{
                                  backgroundColor: data.datasets[0].backgroundColor[index],
                                }}
                              ></div>
                              <span>{label}</span>
                            </div>
                          ))}
                   </div>
               
                </div>
                <div className="rounded bg-white p-10  shadow-sm border-solid border-2 border-sky-500">

                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data1}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pv" fill="#8884d8" />
                     
                    </BarChart>
                  </ResponsiveContainer>
                
                     
                 
                </div>
              </div>
            {/* List of Data */}
              <div className="grid col-1 bg-white h-96 shadow-sm border-solid border-2 border-sky-500">
                
                
              <div class="rounded relative overflow-x-auto shadow-md sm:rounded-lg bg-white   border-solid border-2">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-black uppercase bg-white dark:bg-white dark:text-black border-b border-gray-100">
                          <tr>
                              <th scope="col" class="px-6 py-3 font-semibold">
                                  Product name
                              </th>
                              <th scope="col" class="px-6 py-3 font-semibold">
                                  Color
                              </th>
                              <th scope="col" class="px-6 py-3 font-semibold">
                                  Category
                              </th>
                              <th scope="col" class="px-6 py-3 font-semibold">
                                  Price
                              </th>
                              <th scope="col" class="px-6 py-3 font-semibold">
                                  Action
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr class=" border-b border-gray-100 bg-white ">
                              <th scope="row" class="px-6 py-4 font-normal text-black whitespace-nowrap ">
                                  Apple MacBook Pro 17"
                              </th>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  Silver
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  Laptop
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  $2999
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                              </td>
                          </tr>
                          <tr class=" border-b border-gray-100 bg-white ">
                              <th scope="row" class="px-6 py-4 font-normal text-black whitespace-nowrap ">
                                  Apple MacBook Pro 17"
                              </th>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  Silver
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  Laptop
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  $2999
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                              </td>
                          </tr>
                          <tr class=" border-b border-gray-100 bg-white ">
                              <th scope="row" class="px-6 py-4 font-normal text-black whitespace-nowrap ">
                                  Apple MacBook Pro 17"
                              </th>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  Silver
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  Laptop
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  $2999
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                              </td>
                          </tr>
                          <tr class=" border-b border-gray-100 bg-white ">
                              <th scope="row" class="px-6 py-4 font-normal text-black whitespace-nowrap ">
                                  Apple MacBook Pro 17"
                              </th>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  Silver
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  Laptop
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  $2999
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                              </td>
                          </tr>
                          <tr class=" border-b border-gray-100 bg-white ">
                              <th scope="row" class="px-6 py-4 font-normal text-black whitespace-nowrap ">
                                  Apple MacBook Pro 17"
                              </th>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  Silver
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  Laptop
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  $2999
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                              </td>
                          </tr>
                          <tr class=" border-b border-gray-100 bg-white ">
                              <th scope="row" class="px-6 py-4 font-normal text-black whitespace-nowrap ">
                                  Apple MacBook Pro 17"
                              </th>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  Silver
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  Laptop
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  $2999
                              </td>
                              <td class="px-6 py-4 text-black whitespace-nowrap">
                                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>


              </div>

          </main>
          <footer class="col-span-7 p-10 bg-green-300 border-2 border-sky-500">
            <h1 class="text-center text-2xl">Footer</h1>
          </footer>
        </div>
      
        
         
      
        
        
       
      </div>

      {/* <div className="grid lg:grid-cols-5 gap-5 mb-16 border-solid border-2 border-sky-500">
        <div className="rounded bg-white h-10 shadow-sm border-solid border-2 border-sky-500">
          
        </div>
        <div className="rounded bg-white h-10 shadow-sm border-solid border-2 border-sky-500"></div>
        <div className="rounded bg-white h-10 shadow-sm border-solid border-2 border-sky-500"></div>
        <div className="rounded bg-white h-10 shadow-sm border-solid border-2 border-sky-500"></div>
        <div className="rounded bg-white h-10 shadow-sm border-solid border-2 border-sky-500"></div>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 mb-16 border-solid border-2 border-sky-500">
        <div className="rounded bg-white h-40 shadow-sm border-solid border-2 border-sky-500"></div>
        <div className="rounded bg-white h-40 shadow-sm border-solid border-2 border-sky-500"></div>
        <div className="rounded bg-white h-40 shadow-sm border-solid border-2 border-sky-500"></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-5 mb-16 border-solid border-2 border-sky-500">
        <div className="rounded bg-white h-40 shadow-sm border-solid border-2 border-sky-500"></div>
        <div className="rounded bg-white h-40 shadow-sm border-solid border-2 border-sky-500"></div>
      </div>
      <div className="grid col-1 bg-white h-96 shadow-sm border-solid border-2 border-sky-500"></div> */}


    </div>
  );
}

export default App;
