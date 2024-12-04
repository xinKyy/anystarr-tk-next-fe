import styles from '../../components/Home/home.module.scss';
import {useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";
import SearchDropDown from "@/components/SearchDropDown";
import HomeCard from "@/components/HomeCard";
import SortBy from "@/components/SoryBy";
import {Select, Option, Popover} from 'antd';
import { prodListMock } from '@/constants/Product';
import {APIGetCategoryFirst, APIGetCategorySecond, APIGetProductList} from "@/api";
import CategoryList from "@/components/CategoryList";
import Category2List from "@/components/Category2List";
import SizeBox from "@/components/SizeBox";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import CategoryTreeSelect from "@/components/TreeSelect";
import {getQueryString, isMobile} from "@/utils/action";
import CustomEmpty from '@/components/CustomEmpty';
const SearchBar = dynamic(() => import("@/components/SearchBar"), {
  ssr: false, // 如果组件只在客户端渲染，可以设置为 false
  loading: () => <></>, // 可选：提供一个加载状态
});
let data = [
  {
    "productId": "1729468371730534698",
    "createTime": "2024-06-27T08:01:41.872+00:00",
    "updateTime": "2024-12-02T12:29:34.548+00:00",
    "isDelete": 0,
    "title": "Makeup Tool, Including 20pcs Brush & 4 Sponge & 4 Mini Sponge & 4 Triangle Puff & 4 Mini Puff & 1 Brush Cleaning Tool & 1 Hairband & 2 Wristband, Christmas Gift",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0322174c98be4c23b181db9ffaf7c133~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$15.46 - 15.72",
    "soldNum": 37218,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-04T00:02:20.655+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpx2glauPlQ",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "5850.67",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7c7c950023db4a50a87248fef79f5cc8%7Etplv-aphluv4xwc-origin-jpeg.jpeg%3Ffrom%3D1345521523",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0322174c98be4c23b181db9ffaf7c133~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a650aa12a3ec4728b35f1d3a77451ab3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c41921de9bad413590c57a6bfc966542~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8c3555de33f9425bbe54e88c22486449~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c259b6420b464a13b1e4d0afc3278a90~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/340dad0c464e4a40a25eb78ecd5de377~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/38e526ef5b1a401d82696c00371ef435~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/dea06fe159b94480815e88e4e4c9ee19~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e6aa3eb93d214a699bd91a9f20bc9632~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0322174c98be4c23b181db9ffaf7c133%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a650aa12a3ec4728b35f1d3a77451ab3%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c41921de9bad413590c57a6bfc966542%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8c3555de33f9425bbe54e88c22486449%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c259b6420b464a13b1e4d0afc3278a90%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/340dad0c464e4a40a25eb78ecd5de377%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/38e526ef5b1a401d82696c00371ef435%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/dea06fe159b94480815e88e4e4c9ee19%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e6aa3eb93d214a699bd91a9f20bc9632%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 2,
    "isUpEs": 1,
    "sortValue": 0.6934652694792917,
    "manualFactors": 1,
    "earnPer": "2.830000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729442410928116401",
    "createTime": "2024-06-25T18:20:20.942+00:00",
    "updateTime": "2024-12-04T12:46:56.614+00:00",
    "isDelete": 0,
    "title": "Christmas Gift, Translation Pen with Wifi, Versatile Translation Quick Check, Professional Translation Comparable To Professional Level 8 Translation Pen, 134 Languages Two-way Intercom, Online Scanning Supports 60 Languages, Digital Products",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3920e0ae93754faf88f845bb242f1137~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$28.65",
    "soldNum": 102282,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "10.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T23:18:48.461+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpp4XWLfsxV",
    "daySoldNum": 108,
    "daySoldAmount": "3094.20",
    "soldAmount": "29303.79",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/5e82a65f411f4490bec5ba446e54c4f0%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3920e0ae93754faf88f845bb242f1137~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/10046d9d17bb49c396dae924b67962a2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/287ce0d7bf454e5d8e7d1705bde93a59~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b1b7b8f39c424437ac7d70a41432c896~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/32634d19a9bb46c4b9938f1a58967d07~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c51d273413724be78b4bb60b6b7f8c7a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/645c944811b644adb53bdc381d2efc08~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/51ce4a074c0449d9916024713412a9c5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/223d6bd146224d7bbf59092f0c89f2e0~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3920e0ae93754faf88f845bb242f1137%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/10046d9d17bb49c396dae924b67962a2%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3e5bdb06f3fd4b44814f7360c3bc66cb%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/b1b7b8f39c424437ac7d70a41432c896%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/32634d19a9bb46c4b9938f1a58967d07%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c51d273413724be78b4bb60b6b7f8c7a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/6f2754d003ae48e1bf4c054780002e02%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/287ce0d7bf454e5d8e7d1705bde93a59%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/9640fcbf6d09478587e57af70b5f62ff%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 756,
    "isUpEs": 0,
    "sortValue": 0.6955481607864384,
    "manualFactors": 1,
    "earnPer": "5.160000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729470912301601188",
    "createTime": "2024-07-03T07:11:43.966+00:00",
    "updateTime": "2024-12-02T12:45:54.902+00:00",
    "isDelete": 0,
    "title": "Solar Power Car Tire Pressure Monitoring Tool for Fall, TPMS Tire Pressure Monitoring System, Wireless Tpms Monitor, Digital Display Tire Pressure Gauge, Tire Pressure Monitoring Tool with Replacement Valves, Car Repair Tools, Car Accessories for Girls",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/75b8f72558974938a098bd82b93e74b5~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$16.18",
    "soldNum": 30135,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "8.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-04T00:05:55.589+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AInKTwIqgsLY",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "4875.84",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/6d3fb20d73dd4674b10adb3782436a0e%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0fd317a1fc644f47a40ac21cc92a97c1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/9c8d50e4ac3e4b4d9202f21569cb6162~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a941d5d9deda44198ee209813a1a64b6~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/918405bb52014567a4c92c04e9d8ca4c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/659027e240d2493f8080ba1debf387c3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ed56cc7cbc324db6a466086d2a85330d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/97ed4e7aa378471c8f286a0a448d571a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/99ddbfec4146457dbcb978ae386001f5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/45116cbee2194589b4073079ded302ff~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0fd317a1fc644f47a40ac21cc92a97c1%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/9c8d50e4ac3e4b4d9202f21569cb6162%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a941d5d9deda44198ee209813a1a64b6%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/918405bb52014567a4c92c04e9d8ca4c%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/659027e240d2493f8080ba1debf387c3%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ed56cc7cbc324db6a466086d2a85330d%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/97ed4e7aa378471c8f286a0a448d571a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/99ddbfec4146457dbcb978ae386001f5%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/45116cbee2194589b4073079ded302ff%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 2980,
    "isUpEs": 1,
    "sortValue": 0.6968426656931255,
    "manualFactors": 1,
    "earnPer": "2.910000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729431293249622787",
    "createTime": "2024-06-25T17:40:42.126+00:00",
    "updateTime": "2024-12-04T11:35:56.454+00:00",
    "isDelete": 0,
    "title": "Men's Striped Trim Print Button Front Half Placket Polo Shirt, Polo Shirts Men, Regular Fit Shortsleeve Top, Casual Soft Comfy Short Sleeve Collared Top for Summer, Summer Outfits, Men's Back To School Clothes for Daily Outdoor Wear",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/cacf6762cb5747579bfdcc1b3fadf28e~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$19.04 - 21.31",
    "soldNum": 28210,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T23:02:24.928+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIq5FbJQ2OfR",
    "daySoldNum": 24,
    "daySoldAmount": "24.00",
    "soldAmount": "6011.55",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ab2e47ca4ef64e27838752fa7b6db799%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/cacf6762cb5747579bfdcc1b3fadf28e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0385fb6cc1044bb782e81ab695b11cba~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e8a55d8ea2b7463ea997dbc34a62b4e2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d25a32f1b23d483895056fe77d0385ce~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a36fec3d3d06411482f118df9f35cf9e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4838bd1126bc42e6828b5b1c428a602e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8d194e86520c47308987a1b5cc05514f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b0e804ffa4a7487b8e54d78b67d23597~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3487f95bfb4446d09897ef5fb84d194b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2a0744fa532c4462a806c0648c07ac41%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4258a7014175460bb00ce3c2e4316280%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/644ba93e911845f89d77e703bb69e99e%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/cd3fd287aad14a8cacdd9b893ff8393b%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/f54fefeaa4ac42b7bd10aa5349e682d9%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/f48899effb244de9b809bf7be3bb4837%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/b515b2ca3772421aa91a5434e313ae14%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4523073bf325466198a25e2f25ef36c2%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/26c51024d22546188c8e77fab2fc8c80%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 168,
    "isUpEs": 1,
    "sortValue": 0.698050838186735,
    "manualFactors": 1,
    "earnPer": "3.840000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729411890663559529",
    "createTime": "2024-06-25T17:37:35.878+00:00",
    "updateTime": "2024-12-04T09:34:04.373+00:00",
    "isDelete": 0,
    "title": "Men's Regular Fit Casual Solid Drawstring Waist Shorts, Essential Short Pants for Men, Classic Stylish Summer Clothes Plain Lounge Elastic Waist Pocket Shorts, Personalized Summer Bottoms for Outdoor Back To School, Drippy Outfits Going Out Outfit",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7abf0171cf6246c3906db595d446ecca~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$18.32 - 32.95",
    "soldNum": 16079,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T22:33:29.871+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpx0iyYoTIb",
    "daySoldNum": 2,
    "daySoldAmount": "10.00",
    "soldAmount": "5298.03",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/09340f4dd4d94c4aae61e80618ac9772%7Etplv-aphluv4xwc-origin-jpeg.jpeg%3Ffrom%3D1345521523",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7abf0171cf6246c3906db595d446ecca~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c14d74cd864e4d6c9136d6639634c6c1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fff0c230adda4f82b69a80f8a3930be9~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3bc87e245c944887b748df7e4c7973e7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/170966a6820742b8a17f6a5c1e18a65c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/240621ea33254a18b06ac33b7b2b83e9~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3e2f11d441c64713a5adb182179e7670~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ca338c9f091d453295ac1b258db58783~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d81b18766a6240d1ad06d93597389a2e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7abf0171cf6246c3906db595d446ecca%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c14d74cd864e4d6c9136d6639634c6c1%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/fff0c230adda4f82b69a80f8a3930be9%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3bc87e245c944887b748df7e4c7973e7%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/170966a6820742b8a17f6a5c1e18a65c%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/240621ea33254a18b06ac33b7b2b83e9%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3e2f11d441c64713a5adb182179e7670%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ca338c9f091d453295ac1b258db58783%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d81b18766a6240d1ad06d93597389a2e%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 14,
    "isUpEs": 1,
    "sortValue": 0.6987055880514251,
    "manualFactors": 1,
    "earnPer": "5.930000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729386005411107668",
    "createTime": "2024-06-26T05:12:10.346+00:00",
    "updateTime": "2024-12-04T04:49:10.487+00:00",
    "isDelete": 0,
    "title": "Women's Glitter Contrast Mesh Long Sleeve Ruched Mini Bodycon Dress, Summer Outfits 2024, Lady Comfort Elegant Square Neck Lettuce Trim Short Tight Dresses for Party Dinner Holiday Milkmaid Dress, Womenswear, Birthday Dress for Women Casual",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0103eaca7773471899b5bf49fcd7e5ef~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$19.46 - 34.93",
    "soldNum": 14799,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T21:35:44.590+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AJ37Hau4dOFv",
    "daySoldNum": 88,
    "daySoldAmount": "264.00",
    "soldAmount": "5169.29",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2a79b7a05660438a84c429f2a861c102%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5990b503f4924e64bafb5175d6dd3959~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0fad5f4501bb47489138cabddbc7caa1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8fbd10cf7cae47f092d8f8910d345bb2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6409deac8e314d38854ff066adde084b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/9361a97b42eb4288bc1ec3eeac290fa2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a60828c73f73449087239e6838f3d291~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fe5fd7e639234c448ba43fce3e44e5c2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/918dd92e069141bfb52ee509306d0865~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d0df5d4eef7443b98e7a638eced19135~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/5990b503f4924e64bafb5175d6dd3959%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0fad5f4501bb47489138cabddbc7caa1%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8fbd10cf7cae47f092d8f8910d345bb2%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/6409deac8e314d38854ff066adde084b%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/9361a97b42eb4288bc1ec3eeac290fa2%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a60828c73f73449087239e6838f3d291%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/fe5fd7e639234c448ba43fce3e44e5c2%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/918dd92e069141bfb52ee509306d0865%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d0df5d4eef7443b98e7a638eced19135%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 616,
    "isUpEs": 1,
    "sortValue": 0.7042511216261186,
    "manualFactors": 1,
    "earnPer": "6.290000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729465712058864584",
    "createTime": "2024-06-26T20:09:06.956+00:00",
    "updateTime": "2024-12-02T12:09:01.686+00:00",
    "isDelete": 0,
    "title": "Disposable Face Towel, 1/2/4/6/8/10 Packs Soft Multi-purpose Facial Dry Wipe for Skin Care & Makeup Removal, Facial Cleaning Tool for Hotel Home,  Cleansing Hygiene Products",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a19f3a6ac4c64c37a6a656b946cebbca~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$6.88 - 36.54",
    "soldNum": 18477,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "10.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T23:57:51.879+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpoCm8v9Ib8",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "6751.50",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/1d10a58e1f2e4fb7a3be93251a974810%7Etplv-aphluv4xwc-origin-jpeg.jpeg%3Ffrom%3D1345521523",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a19f3a6ac4c64c37a6a656b946cebbca~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/35a2e88008bd47bb8b2e7cf9aed2a8e9~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5ba52dcea39f47e8862bac4cd1426dd4~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d201f36a094047cba67cfb7253bfbd7d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/584525aa77e542a98f19511aa2bb5098~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/32ca276224bf4652b28ddac75413a2ce~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f516210873a1497e815217061e0339cb~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b601ec1960b44e33aa35d60c14116023~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4756e0a2f5534cdc880e22636b0dc239~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a19f3a6ac4c64c37a6a656b946cebbca%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/35a2e88008bd47bb8b2e7cf9aed2a8e9%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/5ba52dcea39f47e8862bac4cd1426dd4%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d201f36a094047cba67cfb7253bfbd7d%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/584525aa77e542a98f19511aa2bb5098%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/32ca276224bf4652b28ddac75413a2ce%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/f516210873a1497e815217061e0339cb%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/b601ec1960b44e33aa35d60c14116023%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4756e0a2f5534cdc880e22636b0dc239%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": null,
    "isUpEs": 1,
    "sortValue": 0.7049186332812674,
    "manualFactors": 1,
    "earnPer": "6.580000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729414347721838840",
    "createTime": "2024-06-25T20:31:56.188+00:00",
    "updateTime": "2024-12-04T09:48:59.131+00:00",
    "isDelete": 0,
    "title": "Women's Minimalist Plain Elastic High Waist Wide Leg Sweatpants, Spring Comfy Trousers for Daily Wear, Women's Bottoms for Fall & Winter, Pants for Women, Basic Womenswear, Fall Outfits",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/752e5ce106ad443c84a5e6672f902918~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$14.61 - 39.26",
    "soldNum": 15864,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T22:37:04.434+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpIHTFYcWfC",
    "daySoldNum": 10,
    "daySoldAmount": "60.00",
    "soldAmount": "6228.21",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/6ea59ea6a884434a8a7c3d4242ca06ec%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/752e5ce106ad443c84a5e6672f902918~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/98f26e3a7d3a45208786c32447e2043d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/607ab1ef1dc4428397bd79a37de04766~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d1b902cfe6654115993ecd48653ff9b2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/aa50f520b32f41e28b15e926f4f30a7d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0a9c89576bd54b4cac9876d4e9dc64b3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8b5565ae55ce48f4ba02a0a90a0d1ce5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c03c2c5cb0146189cb8532f1b5193d4~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/675e2aae3b8e4ac9ae38f83695aa4b4e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/752e5ce106ad443c84a5e6672f902918%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/98f26e3a7d3a45208786c32447e2043d%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/607ab1ef1dc4428397bd79a37de04766%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d1b902cfe6654115993ecd48653ff9b2%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/aa50f520b32f41e28b15e926f4f30a7d%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0a9c89576bd54b4cac9876d4e9dc64b3%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8b5565ae55ce48f4ba02a0a90a0d1ce5%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/6c03c2c5cb0146189cb8532f1b5193d4%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/675e2aae3b8e4ac9ae38f83695aa4b4e%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 73,
    "isUpEs": 1,
    "sortValue": 0.7072500207129127,
    "manualFactors": 1,
    "earnPer": "7.070000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729471498117877913",
    "createTime": "2024-06-27T17:33:07.817+00:00",
    "updateTime": "2024-12-02T12:47:41.180+00:00",
    "isDelete": 0,
    "title": "Women's Solid Round Neck Tee, Casual Short Sleeve T-shirt for Fall, Back-to-school Clothing, Ladies Clothes for Daily Wear, Women's Basic Top, Womenswear, 90s Clothes",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/11942cd8dd514d27a337705e6246474d~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$13.70",
    "soldNum": 36620,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "10.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-04T00:06:13.509+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpp4ZPm6jtZ",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "5016.94",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d54474ef8da5444f98c867ef74aa8af5%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/251630b7b70b4363a00f9c17075560a7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0e6cbd19a780470eb20cf0a499a399ea~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/11450545f90048b797c7b16b21d2aa52~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/45a2a8d4579f462aa2d70037728771b3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/05224956fbe246f9a8471f6e5921040d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/51e51ebd202049faa5ee1333830ddd97~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e73dab5958fe4edab675d77f153fd0c1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/271f33e803834a318b8a0f8800104749~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/251630b7b70b4363a00f9c17075560a7%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0e6cbd19a780470eb20cf0a499a399ea%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/11450545f90048b797c7b16b21d2aa52%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/45a2a8d4579f462aa2d70037728771b3%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/05224956fbe246f9a8471f6e5921040d%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/51e51ebd202049faa5ee1333830ddd97%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e73dab5958fe4edab675d77f153fd0c1%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/271f33e803834a318b8a0f8800104749%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 19,
    "isUpEs": 1,
    "sortValue": 0.7128973592990911,
    "manualFactors": 1,
    "earnPer": "2.470000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729537191651021274",
    "createTime": "2024-09-26T18:30:25.658+00:00",
    "updateTime": "2024-12-02T16:07:17.404+00:00",
    "isDelete": 0,
    "title": "Women's Letter Print Short Sleeve Bodysuit & Drawstring Waist Pants Set, Casual Round Neck Snap Closure Bodysuit & Pocket Trousers, Ladies Clothes for All Seasons",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/153470caa66c4f21baf7459f209efb09~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$17.21 - 31.20",
    "soldNum": 20378,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "10.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-04T00:47:30.504+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpoZxloaaKL",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "6357.94",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/19cdcd44dbe643b58cb63efac27b2804%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/19cdcd44dbe643b58cb63efac27b2804~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/bb47646c56264dc0ba5a47a47debb818~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b105fb1be6284946a473e08db6d15aee~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0004fa2b3a634ae5912b6bc2a34764e8~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c56fa79e807347c3834b245d4709d87a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/dd5028be595142ea9b6d846cd894d767~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/413ec80103d746eab98e98b7f2d9288c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/19cdcd44dbe643b58cb63efac27b2804%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/bb47646c56264dc0ba5a47a47debb818%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/b105fb1be6284946a473e08db6d15aee%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0004fa2b3a634ae5912b6bc2a34764e8%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c56fa79e807347c3834b245d4709d87a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/dd5028be595142ea9b6d846cd894d767%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/413ec80103d746eab98e98b7f2d9288c%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 1,
    "isUpEs": 1,
    "sortValue": 0.7140854394420659,
    "manualFactors": 1,
    "earnPer": "5.620000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729386005361234676",
    "createTime": "2024-06-25T19:00:43.461+00:00",
    "updateTime": "2024-12-04T04:49:06.405+00:00",
    "isDelete": 0,
    "title": "Men's Flap Pocket Drawstring Cargo Pants, Trousers for Men Daily Outdoor Streetwear, Woven Bottoms for Summer Spring Fall, Going Out Outfit, Please Order One Size up, Menswear, 2000s Pants, Fall Outfits, Earthtone Fallfreshness, Pants for Men",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8d1776dda39048ffb3657c19a1454c76~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$16.74 - 30.17",
    "soldNum": 17689,
    "isApply": 1,
    "totalRate": "18.000000",
    "openRate": "12.0",
    "finishRate": "16.0",
    "lastTime": "2024-12-03T21:35:44.590+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIr7K3Jvqnh6",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "5336.77",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8cc2b40bdc41494087019ad957f11d24%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8cc2b40bdc41494087019ad957f11d24~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c7e00185d5b54dbe95f40a1212a9cc55~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/530501275eae4c46856ba2298d335c9a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d17c2a14ceb1470fbf43507ab02bad3c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ba80a9e6f801460b9dc9e3344f5010eb~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e215cdb190544a688b5a437e1663e717~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b0ef98e4104a4122926ade3cadbbb2a0~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/04582aaf3f6440a9bc2d67afc655c1a5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e9912fc7c77f477e803df2599758e3fa~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8d1776dda39048ffb3657c19a1454c76%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0ff7ed269efe4729acd1b16885d616fe%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/88f43ccec1974a5da9b08524d17c5eef%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/85090ab9634a4fa7820e327445c24e71%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/32365791ac944b86b7f7cd9a388b383d%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/cb757f42e1c34b69bceff124f524e9fa%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/619efa1c028346698a0811059ce1aee7%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d38e9e4d35b941e39858207d1acfc932%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/fbbd59dc274b44d9b963b448a4125187%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 3,
    "isUpEs": 1,
    "sortValue": 0.7156154768453812,
    "manualFactors": 1,
    "earnPer": "4.830000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729524989997519123",
    "createTime": "2024-07-20T15:39:05.385+00:00",
    "updateTime": "2024-12-02T15:49:41.652+00:00",
    "isDelete": 0,
    "title": "Memory Foam Neck Pillow, 1 Count Soft Comfortable Neck Support Pillow, Christmas Decor Neck Rest Cushion for Sleeping, Sleeping Pillow, Soft Neck Pillow,Boyfriend Gifts, Christmas Decorations 2024, Christmas Gifts, Christmas Decorations",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e828f920963d4d33b90d1d3d6ef00039~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$18.58 - 21.44",
    "soldNum": 129281,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-04T00:43:54.329+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpO3ETPe7ny",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "27717.85",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d2c8b48af00443fe9db78a30cf07060e%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e828f920963d4d33b90d1d3d6ef00039~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ffb77b1dbeb74b9b85d782630bf6d5e2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a4ea7228a1b04335bbb214173f271f29~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2b946abd9ddc4276a283442a2eb7fe81~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d929ae0900204f10b8946d78a9859620~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ef2888d155de47d08d1372b9c330a3d7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/aeccb78efb7b4b3ba016b3b111cb0de4~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/53ff168e114444eeb9e434b47b5cd347~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2764292014534ecbaa3b02d132e32794~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e828f920963d4d33b90d1d3d6ef00039%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ffb77b1dbeb74b9b85d782630bf6d5e2%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a4ea7228a1b04335bbb214173f271f29%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2b946abd9ddc4276a283442a2eb7fe81%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d929ae0900204f10b8946d78a9859620%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ef2888d155de47d08d1372b9c330a3d7%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/aeccb78efb7b4b3ba016b3b111cb0de4%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/53ff168e114444eeb9e434b47b5cd347%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2764292014534ecbaa3b02d132e32794%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 1,
    "isUpEs": 1,
    "sortValue": 0.7182538522581889,
    "manualFactors": 1,
    "earnPer": "3.860000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729483801040031999",
    "createTime": "2024-06-27T17:53:43.805+00:00",
    "updateTime": "2024-12-02T14:14:07.057+00:00",
    "isDelete": 0,
    "title": "Men's Business Round Dial Stainless Steel Strap Quartz Watch, Fall Waterproof Luminous Chronograph Watch with Box, Wristwatch for Party, Daily Back To School As Gift, Fall Outfits, Fall Freshness",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ccfe8a0e27e842c28cebc3f8608374ca~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$13.19 - 25.67",
    "soldNum": 19509,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-04T00:23:51.596+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AInKTxCFDhJh",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "5007.96",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2f850ac1ed514ffd9275abfd3f65b7df%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ccfe8a0e27e842c28cebc3f8608374ca~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/361a1ed53fe546458e04d36412264433~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3c9dc90445a2442f9f479103fc1a99ce~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c538782e06304f5f8a3cf329501191fb~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/45ebd856849543389a68ddc337e81c55~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8e2d329643624a05a68fe376da01b44e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3cccef64477a42e3b112e6699c3200a1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/08ec5a77f82f42b8bfd5e7f40d47e47c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/9ac2797d397845ad81ec1ef8612f2f19~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ccfe8a0e27e842c28cebc3f8608374ca%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/361a1ed53fe546458e04d36412264433%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3c9dc90445a2442f9f479103fc1a99ce%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c538782e06304f5f8a3cf329501191fb%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/45ebd856849543389a68ddc337e81c55%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8e2d329643624a05a68fe376da01b44e%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3cccef64477a42e3b112e6699c3200a1%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/08ec5a77f82f42b8bfd5e7f40d47e47c%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/9ac2797d397845ad81ec1ef8612f2f19%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 7,
    "isUpEs": 1,
    "sortValue": 0.7219682676401257,
    "manualFactors": 1,
    "earnPer": "4.620000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729496395107897566",
    "createTime": "2024-07-12T09:34:22.321+00:00",
    "updateTime": "2024-12-02T15:20:02.999+00:00",
    "isDelete": 0,
    "title": "Women's Solid Basic Scallop Trim Wireless Bra, Casual Comfortable Breathable Push Up Lingerie for Daily Wear, Women's Back To School Lingerie for Fall Grwm Underwater",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7b8ee4ca54f549a6abf90dd1ae8a009f~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$13.93 - 26.94",
    "soldNum": 23014,
    "isApply": 1,
    "totalRate": "30.000000",
    "openRate": "12.0",
    "finishRate": "27.0",
    "lastTime": "2024-12-04T00:37:54.383+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIr1GkTLEgfi",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "6199.97",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/da5d4e6757df424d9c63d7b241028807%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7b8ee4ca54f549a6abf90dd1ae8a009f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c22573d6f78c47f7a42c8e1211edaf95~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/32cd9f01c40a45218033071fab6504a9~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7f34c719886f40f1bd5c6b9613868740~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2a6bcf5d0b814943a637febac1c0ce51~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7fe3a677a23344b9b45b35b307c7983e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/23adddb387414159a12ac3749df22b3d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/9c5577ed4d63434fac7234fad6835c5b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c1012d16b54e43799a5795019e57a6f5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7b8ee4ca54f549a6abf90dd1ae8a009f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c22573d6f78c47f7a42c8e1211edaf95%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/32cd9f01c40a45218033071fab6504a9%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7f34c719886f40f1bd5c6b9613868740%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2a6bcf5d0b814943a637febac1c0ce51%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7fe3a677a23344b9b45b35b307c7983e%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/23adddb387414159a12ac3749df22b3d%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/9c5577ed4d63434fac7234fad6835c5b%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c1012d16b54e43799a5795019e57a6f5%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 3,
    "isUpEs": 1,
    "sortValue": 0.7240625672350023,
    "manualFactors": 1,
    "earnPer": "7.270000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729639986228204371",
    "createTime": "2024-09-27T18:56:34.804+00:00",
    "updateTime": "2024-12-03T04:33:50.958+00:00",
    "isDelete": 0,
    "title": "Women's Solid Zip Up Skiing Jumpsuit, Casual Sporty Long Sleeve Jumpsuit for Skiing Cycling,  Jumpsuit for Women, Ladies Sportswear for Fall & Winter 90s Clothes",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b530850c4dbd460c8f1474fc97dd4dfa~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$13.64 - 44.05",
    "soldNum": 13850,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-04T03:05:01.066+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIo88V25dxqq",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "6100.93",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d629b2b631834955b9d716530ebd3702%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d629b2b631834955b9d716530ebd3702~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/60297b3fd42a406c9b93d9148a0cc158~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/28dac5c447474d6989bd8c492e29c75c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a3b40a82a9be4424945619ad34d94a9a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/75bf5eb03fcc4b41b9b54a49544a18e6~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/59e64020ccb54fc6b4e2baa3971a718e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/9eef6bb660084a40808af58b029f1b36~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6fd5f9998aeb49a0becc742653765971~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/42461ff059b34783b721fd11a08d025b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d629b2b631834955b9d716530ebd3702%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/60297b3fd42a406c9b93d9148a0cc158%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/28dac5c447474d6989bd8c492e29c75c%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a3b40a82a9be4424945619ad34d94a9a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/75bf5eb03fcc4b41b9b54a49544a18e6%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/59e64020ccb54fc6b4e2baa3971a718e%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/9eef6bb660084a40808af58b029f1b36%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/6fd5f9998aeb49a0becc742653765971%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/42461ff059b34783b721fd11a08d025b%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 1,
    "isUpEs": 1,
    "sortValue": 0.7253151456868128,
    "manualFactors": 1,
    "earnPer": "7.930000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729414340183429583",
    "createTime": "2024-06-27T05:48:01.006+00:00",
    "updateTime": "2024-12-04T09:48:37.053+00:00",
    "isDelete": 0,
    "title": "Women's Plain Outfit Basic Square Neck Long Sleeve Sports Tummy Control Jumpsuit, Casual Womenswear, Sporty Seamless Jumpsuit for Yoga Gym Workout Running, Comfort Lady Womenswear, Fall Jumpsuits for Women, Ladies Fall & Winter Sports Clothes",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8897da4ecf674ecd81b07f7f331bc00e~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$15.80 - 28.38",
    "soldNum": 21447,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T22:37:04.433+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIqApmfQ8btX",
    "daySoldNum": 19,
    "daySoldAmount": "152.00",
    "soldAmount": "6086.66",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/1aaa17ad38e04344aa47f6b86d8ea074%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8897da4ecf674ecd81b07f7f331bc00e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e1763c1f5fd840438c3f14bcedc1f4f0~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/125d8885e10040ce90e4195254c73520~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0ea7ce9781bb49479231eccdc03c9c62~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b720fa4da0274ebc9e69ea7c25ed304e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a86077a79ff6474fa704b9bd2b0097b3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/af62966467c24ce39ca18ca4a4f941c1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a64ad01a1fed45c18a56e965670c3924~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ad2e505808e64ff998cea9c75997f03a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8897da4ecf674ecd81b07f7f331bc00e%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e1763c1f5fd840438c3f14bcedc1f4f0%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/125d8885e10040ce90e4195254c73520%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0ea7ce9781bb49479231eccdc03c9c62%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/b720fa4da0274ebc9e69ea7c25ed304e%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a86077a79ff6474fa704b9bd2b0097b3%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/af62966467c24ce39ca18ca4a4f941c1%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a64ad01a1fed45c18a56e965670c3924%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ad2e505808e64ff998cea9c75997f03a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 133,
    "isUpEs": 1,
    "sortValue": 0.7269090475458436,
    "manualFactors": 1,
    "earnPer": "5.110000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729385967720764105",
    "createTime": "2024-06-26T00:04:26.863+00:00",
    "updateTime": "2024-12-04T04:21:18.220+00:00",
    "isDelete": 0,
    "title": "Cable Knit Pockets Button Longline Cardigan, Lady Knitting Tops, Fitted Longsleeves V Neck Galentines Night, Minimalist Womenswear, Ladies Knit Outerwear, Cardigan for Women",
    "image": "https://p19-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d247bcc9c47840b69f5217eed6088987~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$27.39 - 28.19",
    "soldNum": 17699,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T21:30:57.772+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AInKTmZOaZGN",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "4989.35",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/772949ce10e0426f9b1ce916749a5df3%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d247bcc9c47840b69f5217eed6088987~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e6c0fb5683e74d59a38aedf42af7a934~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b54894f177c0478e8961d21f2dff0560~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fdec8d2fa72649ef87283d29cd7148b6~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/21d94ac725b94619b5604e8b572a6301~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/869173aa7ee14a80b442ba02de304384~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/27413dd1faa742cc85af0865d47d336b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7825d615ac764f199bb3780df02e7d35~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/72adb14212ef4ec9b83aff2c559a063f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d247bcc9c47840b69f5217eed6088987%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e6c0fb5683e74d59a38aedf42af7a934%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/b54894f177c0478e8961d21f2dff0560%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/fdec8d2fa72649ef87283d29cd7148b6%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/21d94ac725b94619b5604e8b572a6301%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/869173aa7ee14a80b442ba02de304384%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/27413dd1faa742cc85af0865d47d336b%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7825d615ac764f199bb3780df02e7d35%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/72adb14212ef4ec9b83aff2c559a063f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 0.7275547385896541,
    "manualFactors": 1,
    "earnPer": "5.070000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729482826817966936",
    "createTime": "2024-06-27T06:11:34.222+00:00",
    "updateTime": "2024-12-02T14:00:26.956+00:00",
    "isDelete": 0,
    "title": "Two-Piece Set Women's Solid Round Neck Tee & High Waist Biker Shorts Tracksuit Set, Crew Neck Short Sleeve T-shirt & Skinny Shorts, Gym Clothes, Tracksuits for Ladies, Fall Clothes, Casual Back To School Sportswear for Indoor Outdoor Wear, Birthday Gifts",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c9b0f64991fa488a973cdd36f3db2d2a~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$13.59 - 15.21",
    "soldNum": 33098,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-04T00:21:10.153+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpIGy2bmiNA",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "5034.21",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3b7cffb70cdb4ea4a263b5277467fc87%7Etplv-aphluv4xwc-origin-jpeg.jpeg%3Ffrom%3D1345521523",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c9b0f64991fa488a973cdd36f3db2d2a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fa451286020c4cf08110ec8aae8950f0~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5ec3bdc109e7470ca0c4e1061a9a3f66~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/cfb9f47e12594fb281f9615e5d16e175~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/034a7d1f25e845709986a2b953cb068a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e6aa8a3e69c145079ecb79dac6af900b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c8706c76e6b14de5973dcb6fe5647160~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3da1a8c61f024070b878a023075a76ea~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/bf30973d34b3461297f95bbc55c45487~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c9b0f64991fa488a973cdd36f3db2d2a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/fa451286020c4cf08110ec8aae8950f0%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/5ec3bdc109e7470ca0c4e1061a9a3f66%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/cfb9f47e12594fb281f9615e5d16e175%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/034a7d1f25e845709986a2b953cb068a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e6aa8a3e69c145079ecb79dac6af900b%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c8706c76e6b14de5973dcb6fe5647160%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3da1a8c61f024070b878a023075a76ea%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/bf30973d34b3461297f95bbc55c45487%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 137,
    "isUpEs": 1,
    "sortValue": 0.7287445026342986,
    "manualFactors": 1,
    "earnPer": "2.740000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729472028751598251",
    "createTime": "2024-06-25T19:28:39.002+00:00",
    "updateTime": "2024-12-02T13:00:58.673+00:00",
    "isDelete": 0,
    "title": "Silicone Stove Top Mat, Heat Resistant Stove Cover Mat, Non-slip Stove Protector, Kitchen Accessories 1set",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c178674c6aa64653b4b37a4b2ebbe6dc~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$19.88 - 21.33",
    "soldNum": 25335,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-04T00:09:13.417+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpwPkHwDOii",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "5403.96",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/07c80ea823d54be6865d01a6764e65c8%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c178674c6aa64653b4b37a4b2ebbe6dc~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3c645041a8a2450e90602b63d47f6083~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/56528def478941c0946ae370f935c840~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/69a45bb57d3f42428efde81de75228fe~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p19-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/aeb9e4271b074cdc92d64580129f2ce4~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3d524fa31b334b16944e79611aa77b9a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f043d367902f461ea40fa29a2c2ed996~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d3bffb9e85a14a14bea1f1977286733c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/9a430485019b45d9a565227197679210~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c178674c6aa64653b4b37a4b2ebbe6dc%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3c645041a8a2450e90602b63d47f6083%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/56528def478941c0946ae370f935c840%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/69a45bb57d3f42428efde81de75228fe%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/aeb9e4271b074cdc92d64580129f2ce4%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3d524fa31b334b16944e79611aa77b9a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/f043d367902f461ea40fa29a2c2ed996%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d3bffb9e85a14a14bea1f1977286733c%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/9a430485019b45d9a565227197679210%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 2,
    "isUpEs": 1,
    "sortValue": 0.7315963395144953,
    "manualFactors": 1,
    "earnPer": "3.840000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729458345807679811",
    "createTime": "2024-06-26T06:03:34.507+00:00",
    "updateTime": "2024-12-04T14:26:30.539+00:00",
    "isDelete": 0,
    "title": "Room Decor 2024outdoor Solid Color Decorative Ribbon (5 Rolls), Summer DIY Decorative Ribbon, Decorative Ribbon for Wedding Party Cake Gift Packaging, Gifts Wrapping Supplies",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ec0cb430df2a4e13b5724a8f0e40c43b~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$14.87 - 15.12",
    "soldNum": 32711,
    "isApply": 1,
    "totalRate": "30.000000",
    "openRate": "10.0",
    "finishRate": "27.0",
    "lastTime": "2024-12-03T23:44:44.509+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpx09H1Vc7e",
    "daySoldNum": 5,
    "daySoldAmount": "10.00",
    "soldAmount": "65422.00",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/6ff6bf777140438f9afc7ceaf606a1b2%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ec0cb430df2a4e13b5724a8f0e40c43b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/bde9e4756a5e41a78baecf70f1054dfa~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ffcff1bcec2146448179606918a027d0~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/41fc90ece9df4e3981e50e5ad233845f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e982ce8677f949618d3fd4ba3dd0cdf0~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c9caa5b7febb46e78d0161d1701266b5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2a1701015f5b475da162cf8e75b0815f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fce6b329c9fa470a8a0a9bc48c36b02f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ac3a714784514b64baf7e8b62ed940de~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ec0cb430df2a4e13b5724a8f0e40c43b%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/bde9e4756a5e41a78baecf70f1054dfa%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ffcff1bcec2146448179606918a027d0%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/41fc90ece9df4e3981e50e5ad233845f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e982ce8677f949618d3fd4ba3dd0cdf0%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c9caa5b7febb46e78d0161d1701266b5%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2a1701015f5b475da162cf8e75b0815f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/fce6b329c9fa470a8a0a9bc48c36b02f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ac3a714784514b64baf7e8b62ed940de%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 35,
    "isUpEs": 1,
    "sortValue": 0.7318591178380961,
    "manualFactors": 1,
    "earnPer": "4.080000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729432752669167982",
    "createTime": "2024-06-27T12:36:27.553+00:00",
    "updateTime": "2024-12-04T11:43:11.613+00:00",
    "isDelete": 0,
    "title": "Fruit Flavored Moisturizing Lip Gloss, Long Lasting Tinted Hydrating Lip Gloss, Plumping  Glossy Lip Oil Lip Stick for All Occasions, Summer Gift, Lip Care Cosmetic, Prettygirlglaze, Fall Gift Strawberry Makeup",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8492f0ed49c64fff80dddd6ac2970a34~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$3.05 - 10.02",
    "soldNum": 49113,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "10.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T23:04:12.058+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpx0bIWP4aY",
    "daySoldNum": 40,
    "daySoldAmount": "80.00",
    "soldAmount": "4921.12",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a974469c41f2458d87b87009ebe16936%7Etplv-aphluv4xwc-origin-jpeg.jpeg%3Ffrom%3D1345521523",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8492f0ed49c64fff80dddd6ac2970a34~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/76f87972e010476e84818e9460e80409~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/dccdcbc110804ab194ea7af8e3f6f25d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ca917aece0fa452893f36ebf3ab24908~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/072504f564394bc89dcead4ed08b58f3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/63baba9dd56c4995a1f4d8f709720985~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a2e2a212f3554ea38a9653ad683aefc1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/191c6f7fd07548c994c73887b7e3b0cd~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/bc46d1aa969843468370921c1380d53a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8492f0ed49c64fff80dddd6ac2970a34%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/76f87972e010476e84818e9460e80409%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/dccdcbc110804ab194ea7af8e3f6f25d%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ca917aece0fa452893f36ebf3ab24908%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/072504f564394bc89dcead4ed08b58f3%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/63baba9dd56c4995a1f4d8f709720985%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a2e2a212f3554ea38a9653ad683aefc1%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/191c6f7fd07548c994c73887b7e3b0cd%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/bc46d1aa969843468370921c1380d53a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 283,
    "isUpEs": 1,
    "sortValue": 0.7330515902385004,
    "manualFactors": 1,
    "earnPer": "1.800000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729674004735168614",
    "createTime": "2024-10-24T18:31:24.860+00:00",
    "updateTime": "2024-12-03T12:11:49.601+00:00",
    "isDelete": 0,
    "title": "5 in 1 Hair Brush Dryer, 1 Set Hair Dryer & Hair Styler, Hair Styling Tool for Women, Professional Hair Styling Tools for Home & Salon Use",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/29de5b88f113417194fc3cf04f0229db~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$30.25",
    "soldNum": 18685,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-11-29T22:53:42.251+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpp4ksEz3JT",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "5652.21",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/938cad98583c49509a46d020324d3ab8%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/29de5b88f113417194fc3cf04f0229db~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ae8bc1e0533145418551322a2803196f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d14e5455489449fbbce9cb021d40498c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0baadbd756a84ecebee9675a0340e01c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0bb4bbacc498458c846d5cb762f2f4e3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/38c9aa5e98da4c27a3511914e5941e60~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ce00312012544788b047250ba9a011b2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/29de5b88f113417194fc3cf04f0229db%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ae8bc1e0533145418551322a2803196f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d14e5455489449fbbce9cb021d40498c%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0baadbd756a84ecebee9675a0340e01c%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0bb4bbacc498458c846d5cb762f2f4e3%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/38c9aa5e98da4c27a3511914e5941e60%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ce00312012544788b047250ba9a011b2%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": null,
    "isUpEs": 1,
    "sortValue": 0.7381059536887496,
    "manualFactors": 1,
    "earnPer": "5.450000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729468376864362989",
    "createTime": "2024-06-25T19:28:21.777+00:00",
    "updateTime": "2024-12-02T12:29:59.877+00:00",
    "isDelete": 0,
    "title": "2.4G WiFi Smart Wireless Doorbell Camera for Fall Gift, 1080P Smart Ring Camera Doorbell with AI Human Detection, Motion Detector, Two-way Audio, Night-Vision, Instant Alerts, Indoor/Outdoor Surveillance Camera, Summer Safety Supplies, Smart Camera",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/77e3e532ac9348868526b6eeb495fd35~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$15.00 - 33.33",
    "soldNum": 22074,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "10.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-04T00:02:20.655+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpp4bmJnee8",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "7357.26",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0c0bfb3de27747848cbcc3d112864be2%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/77e3e532ac9348868526b6eeb495fd35~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c8cf16610d8b4d4f86c007964ef4ae72~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3e7c55f0fb0244bba79aba5e4ba402f1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/991dade72a2d42eaac53d69802fd594c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/cdd657cc9f984775a5a842196d2e9dff~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3b50a88539c849e780f19f57fba3d722~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0fe568e7006544caa129633f9bdcaf40~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/079143d3080941b19cb27720bd2d6f67~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a1066a08fa4c4bf090306c218ef7c2bf~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/77e3e532ac9348868526b6eeb495fd35%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c8cf16610d8b4d4f86c007964ef4ae72%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3e7c55f0fb0244bba79aba5e4ba402f1%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/991dade72a2d42eaac53d69802fd594c%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/cdd657cc9f984775a5a842196d2e9dff%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3b50a88539c849e780f19f57fba3d722%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0fe568e7006544caa129633f9bdcaf40%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/079143d3080941b19cb27720bd2d6f67%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a1066a08fa4c4bf090306c218ef7c2bf%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 6,
    "isUpEs": 1,
    "sortValue": 0.7423290176369882,
    "manualFactors": 1,
    "earnPer": "6.000000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729413688323117816",
    "createTime": "2024-06-26T04:54:25.824+00:00",
    "updateTime": "2024-12-04T09:46:11.310+00:00",
    "isDelete": 0,
    "title": "Men's Cartoon Face Drawstring Waist Cuffed Cargo Pants, Regular Fit Casual Multi-pocket Utility Jogger Pants, Cargo Pants, 2000s Pants, Summer Outfits 2024, Y2k Fashion Korean Outfits, Drippy Outfits, Going Out Outfit, Fall Outfits, Fallfreshness Clothes",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/27efbdf4a61147459a2debf7067074e7~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$14.95",
    "soldNum": 34153,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T22:36:28.628+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AInKTv3GyPTS",
    "daySoldNum": 58,
    "daySoldAmount": "867.10",
    "soldAmount": "5105.87",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/b6ea32ef9b0f42ec9b7871b802f94719%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/27efbdf4a61147459a2debf7067074e7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/9ce565d8114847fc923e124a660719ae~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/297e7113229e442ea11ebba5b6326d6c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2b20f35e877a447c8f3db6ed9c24732b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8f34cb1c3320408294c74faa91ed3fdb~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/333514da85494130aa12f9a916cda694~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/cc78a61395ca4fa3bb8d6ebb7dcc815a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a4756da5dfc9452686efb4077e630b0b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/608d35e9a8a9431a825ef2a319eeaca1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/27efbdf4a61147459a2debf7067074e7%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/9ce565d8114847fc923e124a660719ae%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/297e7113229e442ea11ebba5b6326d6c%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2b20f35e877a447c8f3db6ed9c24732b%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8f34cb1c3320408294c74faa91ed3fdb%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/333514da85494130aa12f9a916cda694%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/cc78a61395ca4fa3bb8d6ebb7dcc815a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a4756da5dfc9452686efb4077e630b0b%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/608d35e9a8a9431a825ef2a319eeaca1%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 406,
    "isUpEs": 1,
    "sortValue": 0.7430244101980004,
    "manualFactors": 1,
    "earnPer": "2.690000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729467199078109245",
    "createTime": "2024-06-25T19:16:04.486+00:00",
    "updateTime": "2024-12-02T12:20:52.586+00:00",
    "isDelete": 0,
    "title": "Two-Piece Set Women's Solid Pants, Set, Short Sleeve Button Front Crop Blouse & High Waist Pocket Trousers Set, Casual Summer Outfits Clothes Set for Ladies, Apple Shape Outfits",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/237d0406ebf64d40a8632b8e56d2a093~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$20.73",
    "soldNum": 23190,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-04T00:00:33.243+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpseVU8t7WS",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "4807.29",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/237d0406ebf64d40a8632b8e56d2a093%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/237d0406ebf64d40a8632b8e56d2a093~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6335517af0634435b25a5c44b4ac8dc5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/75b7d116e0504eb7b036d91dbdc4d983~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6f2b845efd5d4e31b2d19f2cf38303d9~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e19c36ee7ce841e0ae75f4110b191d3e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/9485875661814fd09f9c6fbda6e77c0f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e359af4da8ef4153ab686e0323c8e455~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/10c3d3d9499e45a492706b7b22acfd1d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c3f91809981842a4b45a75ab3e2b451f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/237d0406ebf64d40a8632b8e56d2a093%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/6335517af0634435b25a5c44b4ac8dc5%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/75b7d116e0504eb7b036d91dbdc4d983%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/6f2b845efd5d4e31b2d19f2cf38303d9%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e19c36ee7ce841e0ae75f4110b191d3e%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/9485875661814fd09f9c6fbda6e77c0f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e359af4da8ef4153ab686e0323c8e455%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/10c3d3d9499e45a492706b7b22acfd1d%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c3f91809981842a4b45a75ab3e2b451f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 10,
    "isUpEs": 1,
    "sortValue": 0.7498929367606579,
    "manualFactors": 1,
    "earnPer": "3.730000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729412895484777228",
    "createTime": "2024-06-27T14:20:05.368+00:00",
    "updateTime": "2024-12-04T09:41:24.281+00:00",
    "isDelete": 0,
    "title": "Women's Plain High Waist Sports Leggings, Sporty Compression Skinny Pants, Women Sport & Outdoor Bottoms for Yoga Gym Workout Running, Women's Tight Pants, Tummy Control",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/de609ae23ecf400fb917d89b6058d732~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$9.51 - 27.19",
    "soldNum": 25764,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "10.0",
    "finishRate": "14.0",
    "lastTime": "2024-12-03T22:35:17.094+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpwXbNDUsH6",
    "daySoldNum": 34,
    "daySoldAmount": "306.00",
    "soldAmount": "7005.23",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7b6560701fa54c48871b0da1e238aa73%7Etplv-aphluv4xwc-origin-jpeg.jpeg%3Ffrom%3D1345521523",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/de609ae23ecf400fb917d89b6058d732~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b7ef003fb0ae474fa4625e3d472a5652~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8c88b2e3ead843129392395481976032~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4b5e65cde5574318a7f74d570ab1c2bb~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fe100265afa243648c4a883946e3c8c0~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d788839f9a00465f9c5826d0b57cb52a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6cb28fbbe13146db93c2b349d433093c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/18f08c767f66458386fd396fb024ce90~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/346fbac32f6f4b00b933d0380b9defb2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/de609ae23ecf400fb917d89b6058d732%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/b7ef003fb0ae474fa4625e3d472a5652%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8c88b2e3ead843129392395481976032%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4b5e65cde5574318a7f74d570ab1c2bb%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/fe100265afa243648c4a883946e3c8c0%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d788839f9a00465f9c5826d0b57cb52a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/6cb28fbbe13146db93c2b349d433093c%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/18f08c767f66458386fd396fb024ce90%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/346fbac32f6f4b00b933d0380b9defb2%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 241,
    "isUpEs": 1,
    "sortValue": 0.7524296148329579,
    "manualFactors": 1,
    "earnPer": "3.810000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729413219518353726",
    "createTime": "2024-06-26T00:15:56.323+00:00",
    "updateTime": "2024-12-04T09:44:09.829+00:00",
    "isDelete": 0,
    "title": "Cow Print Flannel Blanket, Soft Warm Throw Blanket, All Season Blanket, Breathable Comfortable Blanket, Comfy Bedding for Christmas Decor, Napping Blanket for Home Office Sofa, Bed, Travel, Camping, Car, Christmas Gifts, Christmas Decorations",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c2be936cadcf4279a4604b611e9ea7b2~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$12.60 - 21.51",
    "soldNum": 30157,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T22:35:52.865+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpx0BCU9wPi",
    "daySoldNum": 79,
    "daySoldAmount": "79.00",
    "soldAmount": "6486.77",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2c44876c52194d1aaabd02a6969cb53a%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c2be936cadcf4279a4604b611e9ea7b2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7d5af311d9e7442e9a710975c06de936~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c141b00489ec44f8a2a77e2707c8a671~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/06fb12bd20fe4b30afa3aab9c187970a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/49db0ec25ce54a8799aa3045397a7462~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ffd4e1cc1230474397be64606839de51~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/23600e9776d64d81be1b3ac5268b26cb~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0b1a14edddda482d9abb2c12ccaa5e48~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c2be936cadcf4279a4604b611e9ea7b2%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7d5af311d9e7442e9a710975c06de936%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c141b00489ec44f8a2a77e2707c8a671%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/06fb12bd20fe4b30afa3aab9c187970a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/49db0ec25ce54a8799aa3045397a7462%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ffd4e1cc1230474397be64606839de51%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/23600e9776d64d81be1b3ac5268b26cb%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0b1a14edddda482d9abb2c12ccaa5e48%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 553,
    "isUpEs": 1,
    "sortValue": 0.7608060371254978,
    "manualFactors": 1,
    "earnPer": "3.870000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729386026251817161",
    "createTime": "2024-06-27T04:37:09.223+00:00",
    "updateTime": "2024-12-04T05:18:34.882+00:00",
    "isDelete": 0,
    "title": "Summer Eyelash Lengthening Serum, Eyelash Enhancer, Back To School, Eye Lash Caring Products for Longer, Thicker Lashes, Eye Makeup Products for Women Eyelash Extension Projects, Essence Lash Serum, Tubing Mascara for Lash Care Essence",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d775c37cec0b49e4bbd996c5660889cf~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$5.86 - 15.80",
    "soldNum": 33121,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "10.0",
    "finishRate": "14.0",
    "lastTime": "2024-12-03T21:41:06.091+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIq7F2zjsHD0",
    "daySoldNum": 35,
    "daySoldAmount": "0.00",
    "soldAmount": "5233.12",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/735106ecb0ca4eee81710d198c6598bd%7Etplv-aphluv4xwc-origin-jpeg.jpeg%3Ffrom%3D1345521523",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d775c37cec0b49e4bbd996c5660889cf~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1e613f5ec2c54300b17be4a2741e9c11~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/95d0b0018fb545cfac1891f6cdaecc64~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/aab5d047130c4ac5a46f0b61bed639ca~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/962a1f365c064aa9b1a324ab563f9d9b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/048e0bdf8e304ef78b46d98ffe60da3a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6efb20c4096145938f143fb14251b46f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2a39e2234456473f9af0219ec407fb47~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/bcecf7f1c1ce4055bd11fcd3f34e566f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d775c37cec0b49e4bbd996c5660889cf%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/1e613f5ec2c54300b17be4a2741e9c11%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/95d0b0018fb545cfac1891f6cdaecc64%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/aab5d047130c4ac5a46f0b61bed639ca%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/962a1f365c064aa9b1a324ab563f9d9b%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/048e0bdf8e304ef78b46d98ffe60da3a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/6efb20c4096145938f143fb14251b46f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2a39e2234456473f9af0219ec407fb47%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/bcecf7f1c1ce4055bd11fcd3f34e566f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 248,
    "isUpEs": 1,
    "sortValue": 0.7613014287754962,
    "manualFactors": 1,
    "earnPer": "2.210000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729412190268330360",
    "createTime": "2024-06-27T03:04:57.598+00:00",
    "updateTime": "2024-12-04T09:35:28.711+00:00",
    "isDelete": 0,
    "title": "Summer 9-16mm D Curl Individual Eyelashes Extensions Kit, 1 Set Eyelash Extension Fluffy Curl False Eyelashes & Tweezers & Glue, DIY Eyelash Extensions Kit, Lashes Extension Kit, Makeup Set, Cosmetic Products, Christmas Gift",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a48b9efc8aa5463d9e66e4bc099ec335~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$9.77 - 26.26",
    "soldNum": 19416,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "10.0",
    "finishRate": "14.0",
    "lastTime": "2024-12-03T22:34:05.658+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIr7Jyva0Tw6",
    "daySoldNum": 3,
    "daySoldAmount": "18.00",
    "soldAmount": "5098.64",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/fb3b2e691fed4c16a98617deb9435db1%7Etplv-aphluv4xwc-origin-jpeg.jpeg%3Ffrom%3D1345521523",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a48b9efc8aa5463d9e66e4bc099ec335~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/29f1abd79b2a4a31bf8bd7fd4d3803f3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2369e322b696466b8cbd8c1ccee785bd~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/39b7612940e54b3c8097d895da483501~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8d548b3b9bc04e819f37a9a30548d917~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/56b01c1049d749d4b95344f40a98eb0e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1a5fa77eea464b4ab3fc10528297d7ab~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3e2f5a0b9a3b4d6b93c1bbb4885bb917~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d56f81dfd78d403ca042ef0602106509~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a48b9efc8aa5463d9e66e4bc099ec335%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/29f1abd79b2a4a31bf8bd7fd4d3803f3%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2369e322b696466b8cbd8c1ccee785bd%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/39b7612940e54b3c8097d895da483501%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8d548b3b9bc04e819f37a9a30548d917%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/56b01c1049d749d4b95344f40a98eb0e%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/1a5fa77eea464b4ab3fc10528297d7ab%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3e2f5a0b9a3b4d6b93c1bbb4885bb917%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d56f81dfd78d403ca042ef0602106509%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 24,
    "isUpEs": 1,
    "sortValue": 0.7615223109184126,
    "manualFactors": 1,
    "earnPer": "3.680000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729432670348939734",
    "createTime": "2024-06-25T18:57:24.690+00:00",
    "updateTime": "2024-12-04T11:42:09.892+00:00",
    "isDelete": 0,
    "title": "Rotating Curling Iron for Beach Waves, Christmas Portable Electric Hair Curling Iron, 1.1 Inch Hair Curling Wand for Long Short Hair, Lightweight Safety Heated Hair Styling Hairdressing Tools, Hair Products, Christmas Fall Gifts, Gift, Winter Gift",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/bbada26aaaa04bf5860e6084c577cadc~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$20.27",
    "soldNum": 27826,
    "isApply": 1,
    "totalRate": "18.000000",
    "openRate": "12.0",
    "finishRate": "16.0",
    "lastTime": "2024-12-03T23:03:54.174+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AInQv3xle7ur",
    "daySoldNum": 62,
    "daySoldAmount": "1256.74",
    "soldAmount": "5640.33",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7b17b30b53194ae285054caf03e04c6a%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7b3bfb4be69245f59d7f1323b931c067~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/bcfcd2ff30ce4a6a956cb1b2f76e56e4~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5a20df6f7e644ab5b7ba4d3f7345fd92~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c8e56719adbd41b98c99fdd4af6b03e8~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ce9f6f20bac14e1eb056c65557405c89~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2bf74539da824e7489588fff573850d3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8d4e39fb7bbf4994af66bf393657f8fb~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/84e447834b6e44a6bbe5f602a3339bc6~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/85ea8783abf248a8adebd0971cc7089d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7b3bfb4be69245f59d7f1323b931c067%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/bcfcd2ff30ce4a6a956cb1b2f76e56e4%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/5a20df6f7e644ab5b7ba4d3f7345fd92%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7d971888b8824070a2497e37a41a2759%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ce9f6f20bac14e1eb056c65557405c89%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2bf74539da824e7489588fff573850d3%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8d4e39fb7bbf4994af66bf393657f8fb%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/84e447834b6e44a6bbe5f602a3339bc6%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/85ea8783abf248a8adebd0971cc7089d%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 434,
    "isUpEs": 1,
    "sortValue": 0.7660086869809031,
    "manualFactors": 1,
    "earnPer": "3.240000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729465129344012911",
    "createTime": "2024-06-27T04:55:44.303+00:00",
    "updateTime": "2024-12-02T11:59:33.946+00:00",
    "isDelete": 0,
    "title": "Magnetic Impact Phillips Drill Bit Set, 1/4 Inch Hex Shank Drill Bit Set, Insert Drill Bit Set, Power Tool Accessories",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2d42640f534840528e60bf6b84635048~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$20.82 - 25.49",
    "soldNum": 22926,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T23:55:46.632+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AInKTyKOtQX9",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "5843.84",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4fb615b61ce84911a1da03dbb371b2a4%7Etplv-aphluv4xwc-origin-jpeg.jpeg%3Ffrom%3D1345521523",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2d42640f534840528e60bf6b84635048~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/06fa0591f7d94f599f4085483cf559a1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/91aa7cdee1f847f095655ab296988905~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ecb45f8148874a718690b2f4e1aad89e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/9f454a7943cf41818d97134727329497~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7086c5f09700466381232590e13f62a6~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f01c424da15f4793a1313eacc82355e5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a4841aaf2b53436abd84f5766c890404~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/be0a44c0c2e3460d8809d6dd85a71bd8~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2d42640f534840528e60bf6b84635048%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/06fa0591f7d94f599f4085483cf559a1%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/91aa7cdee1f847f095655ab296988905%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ecb45f8148874a718690b2f4e1aad89e%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/9f454a7943cf41818d97134727329497%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7086c5f09700466381232590e13f62a6%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/f01c424da15f4793a1313eacc82355e5%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a4841aaf2b53436abd84f5766c890404%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/be0a44c0c2e3460d8809d6dd85a71bd8%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 100,
    "isUpEs": 1,
    "sortValue": 0.7707513608134156,
    "manualFactors": 1,
    "earnPer": "4.590000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729498395120407236",
    "createTime": "2024-07-05T17:30:14.917+00:00",
    "updateTime": "2024-12-02T15:26:51.670+00:00",
    "isDelete": 0,
    "title": "Fall FHD 1080P Digital Cameras with SD Card, 16X Digital Zoom Camera, Portable Mini Digital Camera for Students Boys Girls, Point and Shoot Portable Camera Digital for Gifts, Back To School Gifts, Boyfriend Gift",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3ba0fe7adc254a0aad99457d0697a9b7~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$15.98",
    "soldNum": 31839,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "10.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-04T00:39:24.036+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIr148hxDrLD",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "5087.87",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/9986709a47d845498c14f97f657e63b3%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3ba0fe7adc254a0aad99457d0697a9b7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/cc8e18a136cd49c780725f4cebf7d755~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0362153833324eae9ccb5e3600bdec7e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f62641d40cc648b894a966c261db26bf~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e6b24c3e46de43848902d0eebfa85f5b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b4fbe424d3ba424599f0703cba7913df~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e2055d023f1f4b97969b267c17b46f29~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1bc9f81dd7224a2c9bcef24337572830~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d13a1b04b04b42198a95552f3f90b047~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3ba0fe7adc254a0aad99457d0697a9b7%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/cc8e18a136cd49c780725f4cebf7d755%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0362153833324eae9ccb5e3600bdec7e%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/f62641d40cc648b894a966c261db26bf%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e6b24c3e46de43848902d0eebfa85f5b%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/b4fbe424d3ba424599f0703cba7913df%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e2055d023f1f4b97969b267c17b46f29%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/1bc9f81dd7224a2c9bcef24337572830%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d13a1b04b04b42198a95552f3f90b047%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": null,
    "isUpEs": 1,
    "sortValue": 0.7712437757433789,
    "manualFactors": 1,
    "earnPer": "2.880000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729418521992401583",
    "createTime": "2024-06-25T21:44:21.302+00:00",
    "updateTime": "2024-12-04T10:18:55.269+00:00",
    "isDelete": 0,
    "title": "Automatic Jar Vacuum Sealer, Kitchen Appliances for New Home, Kitchen Gadgets, Batteries Required Electric Vacuum Sealer for Mason Jar, Household Jar Vacuum Sealing Machine with Digital Display for Food Storage, Kitchen Gadgets, Black Friday Best Buy",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/778b5e340d48455da834497e9bd2e89a~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$23.28 - 41.98",
    "soldNum": 15063,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T22:44:13.360+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIr14En64Usi",
    "daySoldNum": 70,
    "daySoldAmount": "560.00",
    "soldAmount": "6323.45",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/879832bc01b145b888b9536b41e02471%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/778b5e340d48455da834497e9bd2e89a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/302eb8c82e2542838b5015f2ad0949ad~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/778b5e340d48455da834497e9bd2e89a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a0a7f922377247f28bf1da4f017bce99~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/541212ac903d48b2b1c7b7c955e0281d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2b68c3a047cc48578253552991c7d68e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7f974d2798754786b2ef57e7e99b6d56~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8338c37a40e24a9ba497b9060971a868~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2a48ff2d4cec4417af400f25ff78c336~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/778b5e340d48455da834497e9bd2e89a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/302eb8c82e2542838b5015f2ad0949ad%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/778b5e340d48455da834497e9bd2e89a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a0a7f922377247f28bf1da4f017bce99%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/541212ac903d48b2b1c7b7c955e0281d%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2b68c3a047cc48578253552991c7d68e%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/7f974d2798754786b2ef57e7e99b6d56%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8338c37a40e24a9ba497b9060971a868%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2a48ff2d4cec4417af400f25ff78c336%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 490,
    "isUpEs": 1,
    "sortValue": 0.7754390269182484,
    "manualFactors": 1,
    "earnPer": "7.560000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729432798997221646",
    "createTime": "2024-06-27T06:26:18.225+00:00",
    "updateTime": "2024-12-04T11:45:13.348+00:00",
    "isDelete": 0,
    "title": "Stainless Steel Automatic Soap Dispenser, Battery Operated Electric Touchless Liquid Soap Dispenser with 3 Adjustable Volume Control [without Battery], Kitchen Gadgets, Fall Decor, Stocking Fillers Gift",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d6df7ed480bc41ea9694564c451b790f~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$15.27 - 28.98",
    "soldNum": 21191,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T23:04:29.949+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpO580ptUka",
    "daySoldNum": 57,
    "daySoldAmount": "456.00",
    "soldAmount": "6141.15",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/60bb5b34a1b04b7686c7c88f22619ebb%7Etplv-aphluv4xwc-origin-jpeg.jpeg%3Ffrom%3D1345521523",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d6df7ed480bc41ea9694564c451b790f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f0107e333d5b412bb3dd7219b51a6275~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/cd74eaa42f96486d8695ae0d62caeacf~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/67bb987191e44a8091aa06648a6d9e20~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/81fe808910074a6aadc41831cb0984f1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1355ef45f52e4d96a7712d352adc7e19~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5e439afc05614e06962977be1fad5289~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4362330e94644a91b3f6e9f89d711731~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/85ff879b3d23458dbefc49695cbf091a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d6df7ed480bc41ea9694564c451b790f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/f0107e333d5b412bb3dd7219b51a6275%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/cd74eaa42f96486d8695ae0d62caeacf%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/67bb987191e44a8091aa06648a6d9e20%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/81fe808910074a6aadc41831cb0984f1%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/1355ef45f52e4d96a7712d352adc7e19%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/5e439afc05614e06962977be1fad5289%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4362330e94644a91b3f6e9f89d711731%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/85ff879b3d23458dbefc49695cbf091a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 402,
    "isUpEs": 1,
    "sortValue": 0.7777476382807672,
    "manualFactors": 1,
    "earnPer": "5.220000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729416295138300701",
    "createTime": "2024-06-27T17:50:16.632+00:00",
    "updateTime": "2024-12-04T10:02:29.721+00:00",
    "isDelete": 0,
    "title": "Women's Summer 2024 Designer Simple Solid Color Zipper Shoulder Purse Bag, Versatile Underarm Bag, All-match Hobo Dumpling Bag for Daily, Fall Outfits, Earthtone Fall Freshness, for Fall Fall Outfits",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1e58bfedb75f4d2f8dcb994326f939f1~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$11.43 - 30.74",
    "soldNum": 23310,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "6.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T22:40:20.963+00:00",
    "url": null,
    "daySoldNum": 318,
    "daySoldAmount": "1272.00",
    "soldAmount": "7165.49",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/01d9d1f41f3340699616f33d2617b390%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1e58bfedb75f4d2f8dcb994326f939f1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/193fa4cb263a4a959e9b540dbb4fcf50~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5b092452193d4800878a0d4a15d46698~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/47303c18e5ae437aab6deb7607fd4db7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4153a1b666c245d0b9691852267df586~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f4a408049f3c4f73b45188117f2b6317~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f46aa9ca9b6e409495473b51ffec3d09~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p19-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f0f8cba853ce4bfb833e4333e0706f07~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2118fd91d2154d72ab18f5625fc64910~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/1e58bfedb75f4d2f8dcb994326f939f1%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/193fa4cb263a4a959e9b540dbb4fcf50%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/5b092452193d4800878a0d4a15d46698%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/47303c18e5ae437aab6deb7607fd4db7%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4153a1b666c245d0b9691852267df586%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/f4a408049f3c4f73b45188117f2b6317%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/f46aa9ca9b6e409495473b51ffec3d09%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/f0f8cba853ce4bfb833e4333e0706f07%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2118fd91d2154d72ab18f5625fc64910%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 2229,
    "isUpEs": 1,
    "sortValue": 0.7831068502709737,
    "manualFactors": 1,
    "earnPer": "5.530000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729469815136620942",
    "createTime": "2024-06-25T22:26:26.652+00:00",
    "updateTime": "2024-12-02T12:39:12.166+00:00",
    "isDelete": 0,
    "title": "【Meoky】 24oz Double-mouth Slanted Coffee Cup, 1 Count Direct Drinking Mouth and Straw Mouth, Leak-proof Cup Lid, Non-slip Noise Reduction Pad At The Bottom, Stainless Steel Thermos Cup, Wide Mouth and Narrow Bottom for Easy Cleaning and Car Loading",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/9e5d1824e9bc444a93e18981c8b53b8e~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$18.21 - 73.56",
    "soldNum": 7629,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-12-04T00:04:26.046+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIn3wfuAQjEl",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "5611.89",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d16f389a7b754ea586299a88d711052c%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/75b6446db86b4c95adae55a6cd98646d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/97a6584627124f90b1995210af54b089~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/78cc6ae72d224ee2b117919d1a7d6212~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d4f143a0cc064f21af761e9c7e3a0cbd~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c46ba77909c84316a6e0613cea326d20~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5afd4ba02bec4f6d97e6a3e5ec364e23~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/907bc05db7de479a808db14f1fa39d89~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/75b6446db86b4c95adae55a6cd98646d%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/97a6584627124f90b1995210af54b089%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/78cc6ae72d224ee2b117919d1a7d6212%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d4f143a0cc064f21af761e9c7e3a0cbd%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c46ba77909c84316a6e0613cea326d20%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/5afd4ba02bec4f6d97e6a3e5ec364e23%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/907bc05db7de479a808db14f1fa39d89%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 2,
    "isUpEs": 1,
    "sortValue": 0.7851406114389246,
    "manualFactors": 1,
    "earnPer": "10.300000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729411513050370214",
    "createTime": "2024-06-26T05:32:55.927+00:00",
    "updateTime": "2024-12-04T09:30:51.263+00:00",
    "isDelete": 0,
    "title": "Fashion Heart Pattern Crochet Tote Bag, Casual Large Capacity Shoulder Bag for Women Back To School, Summer 2024 Shopping Bag, Female Trendy High Quality School Bag for Daily Wear, Office, College, Work, Commute, Fall Outfits, Fall Freshness",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ae48ec7f02134a7897ef2dacd247ea67~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$10.70",
    "soldNum": 57014,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "10.0",
    "finishRate": "14.0",
    "lastTime": "2024-12-03T22:32:54.118+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpp4wdWc1qB",
    "daySoldNum": 2,
    "daySoldAmount": "21.40",
    "soldAmount": "610049.80",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/40fa22596b054906a042ceea171f6a58%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ae48ec7f02134a7897ef2dacd247ea67~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/01e5e14545564d2595244843f8a272f5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8cdcdfdb45e84a4fa3224f33305d0858~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/402f96c6f8ce400ea2a2c37d43e30a33~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ae48ec7f02134a7897ef2dacd247ea67~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ff38262d8f9645d3b8982e1208cd2aa0~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/aa2b0688c7d84a098ee7d1fe56803002~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/18e96274f13e442d92ecc1adf594ad3a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3dcf748beb2446568eb0641405529303~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ae48ec7f02134a7897ef2dacd247ea67%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/01e5e14545564d2595244843f8a272f5%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8cdcdfdb45e84a4fa3224f33305d0858%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/402f96c6f8ce400ea2a2c37d43e30a33%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ae48ec7f02134a7897ef2dacd247ea67%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ff38262d8f9645d3b8982e1208cd2aa0%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/aa2b0688c7d84a098ee7d1fe56803002%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/18e96274f13e442d92ecc1adf594ad3a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3dcf748beb2446568eb0641405529303%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 17,
    "isUpEs": 1,
    "sortValue": 0.7862842996548599,
    "manualFactors": 1,
    "earnPer": "1.500000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729469620639142456",
    "createTime": "2024-06-25T19:28:28.473+00:00",
    "updateTime": "2024-12-02T12:38:43.441+00:00",
    "isDelete": 0,
    "title": "Women's 2024 Fashion Colorblock Sneakers, Lace Up Low Top Shoes for Women, Breathable Comfortable Sports Running Shoes, Contrast Mesh Designer Shoes for Back To School for Fall 2024, Fall Outfits, Fall Freshness Outfits Mesh Shoes",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d42f4c6627ac4ffe82f0916970158531~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$22.86",
    "soldNum": 31789,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-04T00:04:26.045+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIpO5egv4Itn",
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "7266.97",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/da0303b7c6dc461796cbc6d4a9a00a9a%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d42f4c6627ac4ffe82f0916970158531~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2edc770d7e2e4d2caeb9ebd9d765b391~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fd8bcfb11efe4fa89a343424d121f792~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2d8f9105d0be4537ab6deb52cd096895~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/62356988851e484695cb4856ff0b5413~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0f4863d3ac3f4170993891773bcee894~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/280315ec7a8147449adcccdb366162a8~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/21eced54b6d34df286d5e12f0d82f8a2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/39cc959efafb46a286ba83356b9f90b3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d42f4c6627ac4ffe82f0916970158531%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2edc770d7e2e4d2caeb9ebd9d765b391%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/fd8bcfb11efe4fa89a343424d121f792%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/2d8f9105d0be4537ab6deb52cd096895%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/62356988851e484695cb4856ff0b5413%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0f4863d3ac3f4170993891773bcee894%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/280315ec7a8147449adcccdb366162a8%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/21eced54b6d34df286d5e12f0d82f8a2%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/39cc959efafb46a286ba83356b9f90b3%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 179,
    "isUpEs": 1,
    "sortValue": 0.7914512373998965,
    "manualFactors": 1,
    "earnPer": "4.110000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729541559560212791",
    "createTime": "2024-08-06T18:30:48.133+00:00",
    "updateTime": "2024-12-02T16:23:27.128+00:00",
    "isDelete": 0,
    "title": "Women's Plain Button Front Ribbed Tank Top, Tank Tops for Women, Casual Sleeveless Round Neck Top for Daily Wear, Ladies Clothes for Fall, Fall Outfits, Fallfreshness Clothes,  Birthday Gifts",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e2dcbd9b23564b3f84a9b3e8fafdad59~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$6.69 - 26.38",
    "soldNum": 20173,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "10.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-04T00:50:49.277+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "5321.64",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/45c66c92fb064ceb9a5d46e7b03f28a1%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e2dcbd9b23564b3f84a9b3e8fafdad59~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6a51317133ba46658bd38b8beb2184d2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/23e83bd1bcd44068ade28e46dc8ba47a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4f260973af39438ca6ee3e2b7cd028c7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d36d2f2528da4e33a03f1b2189cf21aa~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4290d36471b843938977215ca36f4882~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/50661c04bd334cbaa4b095725a174928~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a7ce86181d6f46ac8e8a4f2cdd09c7eb~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4ccd7ba41ad143fba89852cbee79356f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e2dcbd9b23564b3f84a9b3e8fafdad59%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/6a51317133ba46658bd38b8beb2184d2%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/23e83bd1bcd44068ade28e46dc8ba47a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4f260973af39438ca6ee3e2b7cd028c7%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/d36d2f2528da4e33a03f1b2189cf21aa%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4290d36471b843938977215ca36f4882%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/50661c04bd334cbaa4b095725a174928%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a7ce86181d6f46ac8e8a4f2cdd09c7eb%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4ccd7ba41ad143fba89852cbee79356f%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": null,
    "isUpEs": 1,
    "sortValue": 0.7919698905101727,
    "manualFactors": 1,
    "earnPer": "4.750000",
    "collect": true,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729412652687921366",
    "createTime": "2024-06-25T17:38:29.211+00:00",
    "updateTime": "2024-12-04T09:37:36.110+00:00",
    "isDelete": 0,
    "title": "Intelligent Music Boxing Target Machine, Wall Mounted Boxing Equipment, Boxing Training Equipment, Fighting Boxing Wall Target Set, Stocking Fillers Gift, Christmas Gift",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/773a818127ab44438bddbc57a65e78a6~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$49.27 - 92.48",
    "soldNum": 8675,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-12-03T22:34:23.509+00:00",
    "url": "https://affiliate-us.tiktok.com/api/v1/share/AIqApxIRDgE0",
    "daySoldNum": 2,
    "daySoldAmount": "16.00",
    "soldAmount": "8022.64",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/3c35c907d654447ebf5e86a959520a70%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D1826719393",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/773a818127ab44438bddbc57a65e78a6~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e354f9756dc24b18b310e12cf5da48b9~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/dbd3862a21c945489c2edfacf6ee0098~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f0b3f21422454e93b4dbbf97108b956e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4b97183e2a1e46f79753c945361789bd~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0bca7248d04d428fa8d0899123dc661a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ab7dbfaec1c14069bb343db874908d83~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/42964f75c5e24bd59724156b87a52c3a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fcc3259333a7423eade4e1f4d4e3894b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/773a818127ab44438bddbc57a65e78a6%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e354f9756dc24b18b310e12cf5da48b9%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/dbd3862a21c945489c2edfacf6ee0098%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/f0b3f21422454e93b4dbbf97108b956e%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4b97183e2a1e46f79753c945361789bd%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0bca7248d04d428fa8d0899123dc661a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/ab7dbfaec1c14069bb343db874908d83%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/42964f75c5e24bd59724156b87a52c3a%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393|https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/fcc3259333a7423eade4e1f4d4e3894b%7Etplv-dx0w9n1ysr-resize-jpeg%3A800%3A800.jpeg%3Ffrom%3D1826719393",
    "day7SoldNum": 17,
    "isUpEs": 1,
    "sortValue": 0.7939642029044449,
    "manualFactors": 1,
    "earnPer": "16.650000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  }
];
let category1IdRef;
let pageRef = 1;
const Home = () => {
  const [prodList, setProdList] = useState(data);
  const [sort, setSort] = useState(5);
  const [sortType, setSortType] = useState();
  const [category1Id, setCategory1Id] = useState(category1IdRef);
  const [page, setPage] = useState(pageRef);
  const [commissionType, setCommissionType] = useState(0);
  const [earnPerType, setEarnPerType] = useState(0);


  const [visibleDropDown, setVisibleDropDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [random, setRandom] = useState(1);
  const [hasMore, setHasMore] = useState(true); // 记录是否还有更多数据
  const scrollDiv = useRef();
  const searchNameRef = useRef();
  const searchNameTypeRef = useRef(2);
  const [currentExt, setCurrentExt] = useState("");

  const getProdList = (searchNameRe, searchType, searchSort) => {
    // setProdList(prodListMock);
    // if (loading) return; // 检查是否正在加载或没有更多数据

    let nowPage = searchNameRe ? 1 : page;

    if (searchNameRe){
      setLoading(true);
    } else {
      setPageLoading(true);
    }
    APIGetProductList(JSON.stringify({
      sort: searchSort ?? sort,
      sortType: sortType,
      page: nowPage,
      pageSize: 40,
      searchName:searchNameRef.current,
      searchType: searchType,
      commissionType: commissionType,
      earnPerType: earnPerType,
      categoryId:category1IdRef
    })).then(resp => {
      if (resp.data.list) {
        if ( nowPage === 1){
          data = resp.data.list.records;
        } else {
          data = prodList.slice().concat(resp.data.list.records);
        }
        setProdList(data.slice());
      }
    }).finally(() => {
      setLoading(false);
      setPageLoading(false);
    }).catch(e=>{
      setPageLoading(false);
      setLoading(false);
    });
  };

  useEffect(() => {
    const back = localStorage.getItem("toProductDetails");
    if (back === "1"){
      setTimeout(()=>{
        localStorage.setItem("toProductDetails", "0");
      }, 300);
      return;
    }
    getProdList();
  }, [sort, page, category1Id, random, sortType, commissionType, earnPerType]);

  const onSortChange = (sortby, sortType) => {
    setSortType(sortType);
    if (sortby !== -1){
      localStorage.setItem("mySort", `${sortby}`);
    }
    if (sortby === 5){
      setRandom(random + 1);
    }
    if (sort === sortby){
      setSort(sort);
      setPage(1); // Reset page when sorting
      pageRef = 1;
      setHasMore(true); // 重置是否还有更多数据
    } else {
      setSort(sortby);
      setPage(1); // Reset page when sorting
      pageRef = 1;
      setHasMore(true); // 重置是否还有更多数据
    }
  };

  const handleScroll = () => {
    if (loading || !hasMore) return;
    const nearBottom = window.innerHeight + document.documentElement.scrollTop >= scrollDiv.current?.offsetHeight - 50;
    if (nearBottom) {
      pageRef = page + 1;
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, pageLoading]);

  const onSearch = (v, searchType) =>{
    setPage(1);
    pageRef = 1;
    searchNameRef.current = v;
    searchNameTypeRef.current = searchType;
    getProdList(v, searchType, 2);

    if (!v) return;
    const item = {name:v, type:searchType};
    let localHistory = localStorage.getItem("history");
    if (localHistory){
      localHistory = JSON.parse(localHistory);
    } else {
      localHistory = [];
    }
    if (localHistory && localHistory.filter(it => it.name === item.name).length === 0){
     localHistory.unshift(item);
    }

    localHistory = localHistory.length > 5 ? localHistory.slice(0, 5) : localHistory;
    localStorage.setItem("history", JSON.stringify(localHistory));
  };

  const onCheckLevel1 = (v) =>{
    pageRef = 1;
    setPage(1);
    if (v === category1Id) {
      setCategory1Id(null);
      category1IdRef = null;
      return;
    }
    setCategory1Id(v);
    category1IdRef = v;
  };

  // 搜索狂选中
  const onSelected = (fieldName, index) => {
    setPage(1);
    if (fieldName === 'commissionType') {
      setCommissionType(index);
    } else {
      setEarnPerType(index);
    }
  };

  useEffect(()=>{
    const sortt = localStorage.getItem("mySort");
    setSort(Number(sortt ?? "5"));
  }, []);

  // 下拉框数据
  const select_data = [
  {
    placeholder: 'Commission rate',
    fieldName: 'commissionType',
    list: [{
      value: 1,
      label: '< 15%',
    },
    {
      value: 2,
      label: '15% - 20%',
    },
    {
      value: 3,
      label: '20% - 25%',
    },
    {
      value: 4,
      label: '25% - 30%',
    },
     {
      value: 5,
      label: '> 30%',
      }
    ]
  },
  {
    placeholder: 'Earn per sale',
    fieldName: 'earnPerType',
    list: [{
      value: 1,
      label: '<$3',
    },
    {
      value: 2,
      label: '$3 - $5',
      },
      {
      value: 3,
      label: '$5 - $10',
    },
     {
      value: 4,
      label: '$10 - $20',
      },
      {
      value: 5,
      label: '>$20',
    },
  ]
  }];


  return (
    <div style={{
      width:"100vw"
    }}>
      <div  onFocus={()=>setVisibleDropDown(false)} ref={scrollDiv} className={styles.home_page}>
        <div className={styles.mobile_wrap}>
          {/* {
            // !mobile &&
            // <CategoryTreeSelect category1Id={category1Id} className={styles.select_category} onCategoryChange={onCheckLevel1}></CategoryTreeSelect>
          } */}
          <div className={styles.select_area}>
            <div className={styles.select_area_item}>
              <CategoryTreeSelect categor2y1Id={category1Id} className={styles.select_category} onCategoryChange={onCheckLevel1}></CategoryTreeSelect>
              {select_data.map((dataSet, index) => (
              <Select allowClear onChange={(value) => onSelected(dataSet.fieldName, value)} placeholder={dataSet.placeholder} key={index} style={{ width: 200, borderRadius: 30 }} dropdownStyle={{border: '1px solid #FC883A', textAlign: 'center',  }} >
                    {dataSet.list.map((item) => (

                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                ))}
            </div>
          </div>

           <div>
            <SearchBar searchNameRef={searchNameRef.current} searchNameTypeRef={searchNameTypeRef.current} loading={loading} onChange={onSearch} />
           </div>


        </div>
        <div className={styles.sort_wrap}>
          <SortBy current={sort} onChange={onSortChange} />
        </div>

        {
          // mobile && <CategoryList onCheckLevel1={onCheckLevel1} currentCategoryId={category1Id}></CategoryList>
        }
        {
          // mobile && category2List && category2List.length  > 0 && <>
          //   <SizeBox h={20}></SizeBox>
          //   <Category2List onCheckLevel2={onCheckLevel2} category2List={category2List} currentCategoryId={category2Id}></Category2List>
          // </>
        }

        {
          // mobile && category3List && category3List.length  > 0 && <>
          //   <SizeBox h={20}></SizeBox>
          //   <Category2List onCheckLevel2={onCheckLevel3} category2List={category3List} currentCategoryId={category3Id}></Category2List>
          //   <SizeBox h={20}></SizeBox>
          // </>
        }

        <Spin style={{
          width:"100%"
        }} spinning={pageLoading} indicator={
          <LoadingOutlined
            style={{
              fontSize: 48,
            }}
            spin
          />} >
          <div className={styles.grid_container}>
            {
              prodList && prodList.map(item => (
                <HomeCard setCurrentExt={setCurrentExt} currentExt={currentExt} key={item.productId} item={item} />
              ))
            }
          </div>
            {
              prodList.length === 0 && <CustomEmpty result={searchNameRef.current}/>
            }
        </Spin>
        <SizeBox h={200}></SizeBox>
      </div>
    </div>
  );
};

export default Home;
