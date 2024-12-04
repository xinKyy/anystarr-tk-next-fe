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
    "productId": "1729946481777414993",
    "createTime": "2024-11-20T20:15:31.966+00:00",
    "updateTime": "2024-12-04T04:01:40.220+00:00",
    "isDelete": 0,
    "title": "CURVZY Plus Size Striped Print Button Front Split Thigh Shirt Dress, Casual Long Sleeve Collared Dress for Spring & Fall, Women's Clothes for Daily Wear",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/532d3ebde9914bdbaac28f538c30a356~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$16.82",
    "soldNum": 4,
    "isApply": 1,
    "totalRate": "25.000000",
    "openRate": "15.0",
    "finishRate": "22.0",
    "lastTime": "2024-11-22T02:34:34.866+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "0.67",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/532d3ebde9914bdbaac28f538c30a356%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/532d3ebde9914bdbaac28f538c30a356~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e520e0a0d5e3474b940848f39600bf6f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a9df09a8714b40c99cf20b4fb0d3aaf8~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p19-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/444de7ab03d84db6b4f735e420b3d154~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/77cbb8a8feef420d9fb0ddeaba8ba2bc~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7acc0ba975aa4c5785daceef7e5ea65b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.0057372908353208,
    "manualFactors": 1,
    "earnPer": "3.700000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729923099699745483",
    "createTime": "2024-11-20T20:15:29.183+00:00",
    "updateTime": "2024-12-04T03:57:30.447+00:00",
    "isDelete": 0,
    "title": "YOZY Women's Colorblock Pocket Zipper Fly Straight Leg Pants, Casual Comfy Trousers for Daily Wear, Ladies Bottoms for All Seasons",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5fde0daaf1e64335a333330f07a05cea~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$16.23",
    "soldNum": 44,
    "isApply": 1,
    "totalRate": "12.000000",
    "openRate": "12.0",
    "finishRate": "11.0",
    "lastTime": "2024-11-22T02:33:56.907+00:00",
    "url": null,
    "daySoldNum": 2,
    "daySoldAmount": "32.46",
    "soldAmount": "7.14",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/5fde0daaf1e64335a333330f07a05cea%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5fde0daaf1e64335a333330f07a05cea~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/175af324543e4882856d0db4740ca754~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0c2a8ef3afd4427db477f8810afc786a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/40870de8737745d38fa26d3f154432c2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/23048f40c70d48cd8ba758bfa9eec6f6~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/850d80c833254270bd75be3903a9c068~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ffd038f437094d7d8dce72477c7b4c18~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 14,
    "isUpEs": 1,
    "sortValue": 1.0066185705889357,
    "manualFactors": 1,
    "earnPer": "1.790000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729923735549218864",
    "createTime": "2024-11-15T19:39:20.856+00:00",
    "updateTime": "2024-12-04T03:58:17.207+00:00",
    "isDelete": 0,
    "title": "Women's Plain Button Front Raglan Sleeve Cable Knit Cardigan, Casual Long Sleeve Round Neck Cardigan Sweater for Fall & Winter, Fashion Women's Knitwear for Daily Wear",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4fed03b0a04746cea15503de8754088f~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$20.14",
    "soldNum": 14,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:34:15.896+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "2.82",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4fed03b0a04746cea15503de8754088f%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4fed03b0a04746cea15503de8754088f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4eddb1958511456188a800136af1bb32~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d12fb6fa2e8348f4a1c2d374ecbac81a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b504d09694244769990f74147d94568b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e6407bec502e4c3fa79908c2cf29d4bf~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c7773ea9f6c242b2b16110f508b2e900~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/41b1f22de1fa4b6a99f0688b8928751a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/582851f754394daf99078c1496cd0e3e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ce79288cd3864da886e12b5b28a36d3a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.008194545575913,
    "manualFactors": 1,
    "earnPer": "2.820000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729942844336410904",
    "createTime": "2024-11-16T19:34:11.515+00:00",
    "updateTime": "2024-12-04T04:01:30.872+00:00",
    "isDelete": 0,
    "title": "S925 Sterling Silver Heart & Cross Design Pendant Necklace with Box, Fashion Jewelry for Party, Daily Clothing Decor, Trendy All-match & Exquisite Jewelry for Gift",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0f8e24b5a1094143a280d9d254676bd6~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$37.50",
    "soldNum": 0,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:34:34.866+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "0.00",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0f8e24b5a1094143a280d9d254676bd6%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0f8e24b5a1094143a280d9d254676bd6~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e7a66a0cde4e43038f6918c405d66203~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f9b06d5b9c164401ab92a3b2e8cb7787~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c7bbaeb2479449aab4040906f2e99a9c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e0fb8ce803b24308909084fcfbb83aa6~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2eb8aed23f7f40f9855803347014c5c7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/10ce294090c84125b459f486646ac01d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8b608c62b2f04ed5aa2ba111585b7787~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/27913c84526f4e22a2ad78e11583bff7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.009701282458597,
    "manualFactors": 1,
    "earnPer": "5.250000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729944494150358000",
    "createTime": "2024-11-16T19:34:11.537+00:00",
    "updateTime": "2024-12-04T04:01:33.614+00:00",
    "isDelete": 0,
    "title": "925 Sterling Silver Cross Design Dangle Earrings, Fashionable Earrings for Women & Girls, Trendy All-match & Exquisite Jewelry for Birthday Gift",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/001e048b7b1d4dadbba4612d86f14e68~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$18.52",
    "soldNum": 0,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:34:34.866+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "0.00",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/001e048b7b1d4dadbba4612d86f14e68%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/001e048b7b1d4dadbba4612d86f14e68~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8aee7e41f8b7451abf1d116d890bdf79~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d0af023896d34b21b45a260790dbc3d3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/18eee51f3f984f409b2a13d64f0d4e79~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7a891257093048159bd21328a944233f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c808bf628ab84f0d8ab73ca6f026ac51~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/93142206d64b422fa74f1e156c69383b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5677ba65d57d46c99454d9311a797f4f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.0104185493433526,
    "manualFactors": 1,
    "earnPer": "2.590000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729923196772979403",
    "createTime": "2024-11-20T20:15:31.687+00:00",
    "updateTime": "2024-12-04T03:58:02.370+00:00",
    "isDelete": 0,
    "title": "YOZY Women's Contrast Binding Button Front Top & Striped Print Elastic Waist Skirt Two-piece Set, Casual Long Sleeve V Neck Top & Skirt for Spring & Fall, Women's Clothes for Daily Wear",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5b5c7fd84c954b389a63731b1c016aa8~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$22.03",
    "soldNum": 14,
    "isApply": 1,
    "totalRate": "12.000000",
    "openRate": "12.0",
    "finishRate": "11.0",
    "lastTime": "2024-11-22T02:33:56.907+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "3.08",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/5b5c7fd84c954b389a63731b1c016aa8%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5b5c7fd84c954b389a63731b1c016aa8~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b50b268b412a4bb6acca364d0b6f880f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/dae8c778d67441b19815a895ff2dc481~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/254ea169d5a44e2c9406ec09598df80c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e631a1d337f345ad9ca664e79518d81a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/abc48685ae3446359b4d55019c2b7871~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/956417610e5b4d75839596dd1828025d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/486be88a0386440fb78a8a889a4e270e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p19-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7b90eae6616641379f6ab88e0dc95ccd~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 3,
    "isUpEs": 1,
    "sortValue": 1.0133195961110029,
    "manualFactors": 1,
    "earnPer": "2.420000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729915831817703594",
    "createTime": "2024-11-19T20:41:07.429+00:00",
    "updateTime": "2024-12-04T03:56:10.456+00:00",
    "isDelete": 0,
    "title": "Men's Punk Style Rhinestone Decorated Cow Head Design Pendant Necklace, Fashion Jewelry for Party, Daily Clothing Decor, Trendy All-match & Exquisite Jewelry for Birthday Gift",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/568fcd6657a04fa5845c21b5371c2b67~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$11.81",
    "soldNum": 81,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:33:56.907+00:00",
    "url": null,
    "daySoldNum": 6,
    "daySoldAmount": "70.86",
    "soldAmount": "9.57",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/568fcd6657a04fa5845c21b5371c2b67%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/568fcd6657a04fa5845c21b5371c2b67~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e84f5fe5b093418486819e5460feffba~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d8211f0ee0984fe79849b8171e009696~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b8a5d8a682c740db87a1f88a972456e8~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/590eb70eac274100907eaab61178f219~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4cabb183933140208d7e854e16fc2209~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3351545af7ec40fea0867ab7594ff2e3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/58dd31e2365e4afeb9eab3d5a7b78623~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0a311837505d41ea8311d503006e30ce~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 42,
    "isUpEs": 1,
    "sortValue": 1.014782961400781,
    "manualFactors": 1,
    "earnPer": "1.650000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729921537036227019",
    "createTime": "2024-11-19T19:40:26.839+00:00",
    "updateTime": "2024-12-04T03:57:12.994+00:00",
    "isDelete": 0,
    "title": "Inflatable Snowman Decoration, Outdoor Inflatable Decoration with Built-in Music & Rotating Colorful Projector LED Lights, Outdoor Decoration for Garden Yard",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/318a27ca88d245568db16ee77e4360bd~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$107.09",
    "soldNum": 4,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:33:56.907+00:00",
    "url": null,
    "daySoldNum": 1,
    "daySoldAmount": "107.09",
    "soldAmount": "4.28",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/318a27ca88d245568db16ee77e4360bd%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/318a27ca88d245568db16ee77e4360bd~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4b60422210c54fd28f62176b4c9766cc~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/bb56c5a2989a42a59a88bfaaecf46cf1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/dd4983c8b41642ebad056df6eff347e5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 7,
    "isUpEs": 1,
    "sortValue": 1.0209933838233418,
    "manualFactors": 1,
    "earnPer": "14.990000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729923193851515595",
    "createTime": "2024-11-20T20:15:31.509+00:00",
    "updateTime": "2024-12-04T03:57:54.377+00:00",
    "isDelete": 0,
    "title": "YOZY Women's Contrast Mesh Leggings, Solid Color Skinny Pants, High Stretch Yoga Leggings, Ladies Sportswear for Indoor Outdoor Wear",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0b0427d2cfe34e59895a4b701326cff0~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$9.51",
    "soldNum": 18,
    "isApply": 1,
    "totalRate": "12.000000",
    "openRate": "12.0",
    "finishRate": "11.0",
    "lastTime": "2024-11-22T02:33:56.907+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "1.71",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0b0427d2cfe34e59895a4b701326cff0%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0b0427d2cfe34e59895a4b701326cff0~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/15c5849030504b339724138f94de9972~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/04a418320a754a55892060e8b5a76708~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ab7052c7b5774ebf873d7cde8d082a68~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e459705b71ae439fa3a580395db20196~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8f7fd182b3e04d4fbb01b84414bcbf60~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/775c358d419949e4ab7b256b106ad265~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c02d3aefebd7498fa86b01d783e7fb69~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 3,
    "isUpEs": 1,
    "sortValue": 1.0222294881776075,
    "manualFactors": 1,
    "earnPer": "1.050000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729914177341395775",
    "createTime": "2024-11-14T19:38:13.166+00:00",
    "updateTime": "2024-12-04T03:55:53.770+00:00",
    "isDelete": 0,
    "title": "Men's Figure & Letter Print Drawstring Pocket Sports Hoodie, Regular Fit Sporty Long Sleeve Hooded Sweatshirt for Fall & Winter, Men's Top for Daily Wear",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/98ad4332e30b4a5bbdc2ce8ff62a0b51~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$19.23",
    "soldNum": 0,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:33:56.907+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "0.00",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/98ad4332e30b4a5bbdc2ce8ff62a0b51%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/98ad4332e30b4a5bbdc2ce8ff62a0b51~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6ddc5a6778ed41109906d85d8cae7b9d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/bfa12ce4c3d54ed3bd44dd58a14851a5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b7dcf820b9fb47f3901758d302899409~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/151155968c2a4f33a0bd4a1692a00ac7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/9b04b4c097c04125bd7bcb2b3ab54b8a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e1bcbf38e9054c38b85a4ea94ca5cd8e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4529375771954e508eafe1b4bf374aac~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b271168276354b07b00584ef03cf7d28~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.0239082072710077,
    "manualFactors": 1,
    "earnPer": "2.690000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729986631005671747",
    "createTime": "2024-11-20T19:41:57.040+00:00",
    "updateTime": "2024-12-04T04:05:17.713+00:00",
    "isDelete": 0,
    "title": "Glow in The Dark Marker Pen, 4 Counts Dual Tip Dual Colors Marker Pen, DIY Graffiti Highlighter Pen for Writing, Scrapbooking, Coloring",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1c19ff2ac4a1423189fc3d13a977cf1a~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$12.86",
    "soldNum": 14,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:34:53.828+00:00",
    "url": null,
    "daySoldNum": 1,
    "daySoldAmount": "12.86",
    "soldAmount": "1.80",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/1c19ff2ac4a1423189fc3d13a977cf1a%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1c19ff2ac4a1423189fc3d13a977cf1a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/465fe2e8cc644d93aadcb12a4bbc29e7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7429918a7e4d4c5c8e802ebe673c7b28~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/da7d0a17a41745e983af5b683a2abe24~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/da99f2bcc33942928f4b9458f6af72ff~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/348b17cfe6ec451fb4ee82ef87811cfe~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c21a0b92c96b46708f89ebbf588815b5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/10055712b5dc452a90a41ea9d3d65c83~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/16838d1de0d74f63893be4ba01720bab~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 7,
    "isUpEs": 1,
    "sortValue": 1.0242801225757476,
    "manualFactors": 1,
    "earnPer": "1.800000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729911685697802991",
    "createTime": "2024-11-15T19:39:17.636+00:00",
    "updateTime": "2024-12-04T03:55:28.941+00:00",
    "isDelete": 0,
    "title": "Unisex Colorblock Zip Up Plush Hoodie Top, Casual Long Sleeve Pocket Hooded Top for Fall & Winter, Men's Clothes for Daily Wear",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/00cef5a9cbbf45548c1df2a0ae9f30de~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$25.49 - 46.40",
    "soldNum": 0,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:33:37.978+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "0.00",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/00cef5a9cbbf45548c1df2a0ae9f30de%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/00cef5a9cbbf45548c1df2a0ae9f30de~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0d8fc55c19534fc09e47043bdad11473~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/079ad30391a842378d8a5cebf0090942~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c989fd56d0d24b84b54c5edf8537902b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/22eb0eecfeac47bc914ceffa70260c2c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f45815bc16f24222ba373e844f143d04~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/36254882205545168090bb791334d471~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/61b5f8097bfe433585dc96d6d6ca6875~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.0245170466403288,
    "manualFactors": 1,
    "earnPer": "6.500000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729923196046643915",
    "createTime": "2024-11-20T20:15:31.625+00:00",
    "updateTime": "2024-12-04T03:57:59.606+00:00",
    "isDelete": 0,
    "title": "YOZY Women's Glitter Button Front Shirt, Elegant Long Sleeve Collared Top for Party Holiday, Ladies Clothes for All Seasons",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/34b6194a0aa14b35ac5a2fa9789e1876~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$13.00",
    "soldNum": 8,
    "isApply": 1,
    "totalRate": "12.000000",
    "openRate": "12.0",
    "finishRate": "11.0",
    "lastTime": "2024-11-22T02:33:56.907+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "1.04",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/34b6194a0aa14b35ac5a2fa9789e1876%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/34b6194a0aa14b35ac5a2fa9789e1876~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f5dc55d574b148d0aae5cf70bcb69982~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1fdbefe406b54960bd26909338926e70~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b777a016e7fe4affa947c00875ac0be7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/459bc97316b04a0e969ad3876352e777~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7621d92f7b0f450ebb63038de8a1d5f9~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ed27237c73dc4274835e6b9978d3bd8f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.0250957947806156,
    "manualFactors": 1,
    "earnPer": "1.430000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729931978590950384",
    "createTime": "2024-11-16T19:34:11.259+00:00",
    "updateTime": "2024-12-04T04:00:18.498+00:00",
    "isDelete": 0,
    "title": "S925 Sterling Silver Flower Design Synthetic Zirconia Pendant Necklace & Dangle Earrings, Fashion Jewelry for Party, Daily Decor, Trendy All-match & Exquisite Jewelry for Birthday Gift",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/38fd999a905c4ff893e55e51fa157622~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$46.12",
    "soldNum": 0,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:34:15.897+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "0.00",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/38fd999a905c4ff893e55e51fa157622%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/38fd999a905c4ff893e55e51fa157622~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/08e559d5af2e490fbeed3627e8511f29~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/264ae4d70df34b6c93df10b762a7f097~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/db94e03acdb448949158f7ad05f80a9d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6577d980a5af49ee8ddbfc487c98f2c5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8e37d354cf174647b3a572a80fcb2eb2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a34a9e223667459e8634c44a0aae0ea9~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5677ba65d57d46c99454d9311a797f4f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.0359331198636044,
    "manualFactors": 1,
    "earnPer": "6.460000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729923186655531723",
    "createTime": "2024-11-20T20:15:31.385+00:00",
    "updateTime": "2024-12-04T03:57:49.471+00:00",
    "isDelete": 0,
    "title": "YOZY Women's Plain 3D Flower Decor Split Thigh Pencil Skirt, Elegant Fashion Casual Long Skirt for Daily Outdoor Wear, Women Bottoms for All Seasons",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/42b5f0a0e0c948369aad8c61e12cefbe~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$11.38",
    "soldNum": 6,
    "isApply": 1,
    "totalRate": "12.000000",
    "openRate": "12.0",
    "finishRate": "11.0",
    "lastTime": "2024-11-22T02:33:56.907+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "0.68",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/42b5f0a0e0c948369aad8c61e12cefbe%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/42b5f0a0e0c948369aad8c61e12cefbe~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/77570f0995d74c3d9d470d634a51ee9a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f69afedec0ea4c5b9e8ad3db5826eaaf~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d4067b7d98a24b3cbc6e39d4588f1e98~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1502ae4fac154df19e1c781216b4c76f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3a5740d1f0294fd7b4e8a618c96f9858~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/db09f3550bea41d29c403ab9aa818752~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f0e2f8e7b4e044a897fd711e51d478a1~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2bc7f2cf6e8b444182ddde4b9a2c6691~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 3,
    "isUpEs": 1,
    "sortValue": 1.0369990927194204,
    "manualFactors": 1,
    "earnPer": "1.250000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729901407910203642",
    "createTime": "2024-11-12T19:37:43.306+00:00",
    "updateTime": "2024-12-04T03:54:30.226+00:00",
    "isDelete": 0,
    "title": "Christmas Candy Shaped Gift Box, 11pcs/set Creative Gift Box with Ribbon, Gift Wrapping Supplies for Holiday Party Birthday",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e930701ee82c4b1a97855758893aa3c4~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$15.12 - 16.06",
    "soldNum": 0,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:33:37.978+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "0.00",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e930701ee82c4b1a97855758893aa3c4%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e930701ee82c4b1a97855758893aa3c4~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/282677ce488542179e7d5650e1c840f8~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/378df3e4cef340569cbc6211f4160b65~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/06191777200e4e359983e0e2f78df366~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b350763bfff74b15aa00ffc93410c465~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4f3a9c6e26e74717870a5ce8883bf812~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ced374a8f5734f569f56ae75be2efa53~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/062af969e45040e497458bab21efb443~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8a26e32518c1420a8f80de2b278236fd~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.0375116451046407,
    "manualFactors": 1,
    "earnPer": "2.250000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729946451517739857",
    "createTime": "2024-11-20T20:15:31.925+00:00",
    "updateTime": "2024-12-04T04:01:38.349+00:00",
    "isDelete": 0,
    "title": "CURVZY Plus Size Three-Piece Set Solid Drop Shoulder Zip Up Pocket Hooded Jacket & Drawstring Waist Pants & Tank Top Set, Casual Fashion Cozy Breathable Outfits for Daily Outdoor Wear, Women Clothing for Fall & Winter",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/12c0778fc7b04ab6b04990768065c1a9~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$42.36",
    "soldNum": 8,
    "isApply": 1,
    "totalRate": "25.000000",
    "openRate": "15.0",
    "finishRate": "22.0",
    "lastTime": "2024-11-22T02:34:34.866+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "3.39",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/12c0778fc7b04ab6b04990768065c1a9%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/12c0778fc7b04ab6b04990768065c1a9~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3ed8366f174649b1a7ab7106c023591a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a2147062c77c42699b1d202b329c9882~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5e89df31b45e47af94ad8463c206e62f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c74b81cdf3a44f05ba648a51d2550216~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fb80094b175947af8c6d8f048bc3e102~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 3,
    "isUpEs": 1,
    "sortValue": 1.037621916171181,
    "manualFactors": 1,
    "earnPer": "9.320000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729948920004055316",
    "createTime": "2024-11-19T19:40:29.750+00:00",
    "updateTime": "2024-12-04T04:02:29.344+00:00",
    "isDelete": 0,
    "title": "Garden Hose with Sprayer, Expandable & Flexible Garden Hose with Sprayer, Lightweight Water Hose for Watering & Car Washing",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4085630b424e44f6b2af2f34f6a129bd~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$18.45 - 32.82",
    "soldNum": 10,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:34:34.867+00:00",
    "url": null,
    "daySoldNum": 1,
    "daySoldAmount": "2.00",
    "soldAmount": "3.28",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/4085630b424e44f6b2af2f34f6a129bd%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4085630b424e44f6b2af2f34f6a129bd~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8e03bdab90644573a7422f8f56ba5571~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/32f52ed4e2a84a5da4bef789245848d0~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a0a2cf8966d54c3fb31daca2d51fb9b6~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/85e1747cde5a410a8f3d830d03b03599~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4316628775134e7489ccb4bab53c795c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/62a22f8966d2489ea8843f9c18216e90~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2f1e9b77530f4ffb9f99cd22efd7eae0~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f962e0ae17084497835f21c30f60bd60~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 7,
    "isUpEs": 1,
    "sortValue": 1.0389788799029893,
    "manualFactors": 1,
    "earnPer": "4.590000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729923156370559691",
    "createTime": "2024-11-14T20:57:17.931+00:00",
    "updateTime": "2024-12-04T03:57:43.057+00:00",
    "isDelete": 0,
    "title": "YOZY Women's Contrast Binding Double Button Blazer & Wide Leg Pants Two-piece Set, Casual V Neck Long Sleeve Outerwear & Trousers for Work Office Business, Ladies Two-piece Outfits for All Seasons",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0c92ac029163467183124d09387fffa2~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$20.79",
    "soldNum": 94,
    "isApply": 1,
    "totalRate": "25.000000",
    "openRate": "12.0",
    "finishRate": "22.0",
    "lastTime": "2024-11-22T02:33:56.907+00:00",
    "url": null,
    "daySoldNum": 6,
    "daySoldAmount": "124.74",
    "soldAmount": "19.54",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/0c92ac029163467183124d09387fffa2%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0c92ac029163467183124d09387fffa2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/5bf4baa8d8914d28aad0dc9bc625334d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/296a59058a634cb69d3f8a02528242c9~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/044fbd53ddae4146be3c1447f47edb3c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/011bd3b2480b4262a33e8753b4a4e18e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/743dead4b1d04b31956cbf360810137b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6813492750fb4315a5870426d4df7b5f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8ab836f0d69c426fb0676eb335479508~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8820a7f9021a44a3a63033e94c44c425~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 42,
    "isUpEs": 1,
    "sortValue": 1.0442758669629137,
    "manualFactors": 1,
    "earnPer": "4.570000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729966216120275550",
    "createTime": "2024-11-19T19:40:30.246+00:00",
    "updateTime": "2024-12-04T04:04:12.251+00:00",
    "isDelete": 0,
    "title": "Women's Striped Print Drop Shoulder Sweatshirt & Drawstring Waist Sweatpants Two-piece Set, Casual Fashion Cozy Round Neck Long Sleeve Pullover & Pocket Jogger Pants for Daily Wear, Ladies Fall & Winter Clothes",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/53f10a77ba3e4c5083c5cd31c2f95b49~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$20.92",
    "soldNum": 0,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:34:53.828+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "0.00",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/53f10a77ba3e4c5083c5cd31c2f95b49%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/53f10a77ba3e4c5083c5cd31c2f95b49~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/65481877a22c4956b286da11fb6a8806~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/15556b68e4254cdd886568c05a374818~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e6efd96419bd4edcad21304fa386fc5f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/677ea0c9ee584f748974dcdeec5445b2~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/35146969f99943b9b7069b991d8243e0~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/64a1a9c4427d4125a51c1dc7dddde1fd~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/dbc9c23e172642a29e6d6a5e274fcfeb~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/747b20ab14944a86a8c0e50ff556d68c~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.0443022109700466,
    "manualFactors": 1,
    "earnPer": "2.930000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729893537013666636",
    "createTime": "2024-11-18T18:39:07.084+00:00",
    "updateTime": "2024-12-04T03:54:06.763+00:00",
    "isDelete": 0,
    "title": "Women's Fashionable Solid Color Square Toe Slip on Pumps, Casual Comfortable Breathable Shoes for Daily Wear, All Match Shoes for Daily Wear",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/33675a9b8f5742bfa156769850d0eba7~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$33.73",
    "soldNum": 0,
    "isApply": 1,
    "totalRate": "20.000000",
    "openRate": "12.0",
    "finishRate": "18.0",
    "lastTime": "2024-11-22T02:33:37.978+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "0.00",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/33675a9b8f5742bfa156769850d0eba7%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/33675a9b8f5742bfa156769850d0eba7~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fa4478198aed4a22b0e2df856a369b15~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3e2a8e47fa394501919314bc3a0cd68f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1a9e04077b764a49bb51f8d3c9a07955~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0ea1c78ae7b147d29679bfdd35b7275b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fe925f7bd0c542b5ab1c92e45c5a6291~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0d4266bf7c9e4f8082d4271a73bfcbf0~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.0452238593143135,
    "manualFactors": 1,
    "earnPer": "6.070000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729986802169909817",
    "createTime": "2024-11-19T19:40:30.392+00:00",
    "updateTime": "2024-12-04T04:05:20.588+00:00",
    "isDelete": 0,
    "title": "Electric Cat Teaser Toy, 1 Box USB Rechargeable Automatic Cat Teaser Toy with Feather & Bell, Interactive Cat Toy, Pet Supplies for Indoor Cats",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/85f61b4a3dae4a3497b7319fae15ab0e~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$23.00",
    "soldNum": 5,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:34:53.828+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "1.15",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/85f61b4a3dae4a3497b7319fae15ab0e%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/85f61b4a3dae4a3497b7319fae15ab0e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7c44178cacb94af5b3fbfa117def7877~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/797c994f72f4427d989c680708cbab78~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c1d814302e8748009738b79b2ae4c111~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/4ee806aa87e74cdeb509d99ac927cdf8~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2daf095b93e041c8b5da0a090910a031~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e43c651a724e43dfa19619ca7060c15f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p19-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3d021cdd0a6e47ba870fb7a8c53eb133~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 3,
    "isUpEs": 1,
    "sortValue": 1.0461873755401347,
    "manualFactors": 1,
    "earnPer": "3.220000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729893592652222514",
    "createTime": "2024-11-19T19:40:23.822+00:00",
    "updateTime": "2024-12-04T03:54:10.517+00:00",
    "isDelete": 0,
    "title": "Women's Fashion Plain Color Tote Bag, Large Capacity Shoulder Bag with Cute Rabbit Charm, Casual Trendy Versatile High-quality Daily Commuting Bag",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c4ed879a56b8414099305ae0324cff11~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$18.32",
    "soldNum": 14,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:33:37.978+00:00",
    "url": null,
    "daySoldNum": 1,
    "daySoldAmount": "18.32",
    "soldAmount": "2.56",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/c4ed879a56b8414099305ae0324cff11%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c4ed879a56b8414099305ae0324cff11~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/72c74024c58b4b619c8320c281a56a90~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/efae5f71cf164707a93ac65d6da34b43~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b42477fa1f2844c0aafb6a5757bb77e9~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6d7215ff4799466facba1c43bb9dea67~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6ed72d64c95644a9afd3ab297aa1b996~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/334b50ac2815496c86b7938034e8428f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 10,
    "isUpEs": 1,
    "sortValue": 1.04693737360637,
    "manualFactors": 1,
    "earnPer": "2.560000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729926641693725423",
    "createTime": "2024-11-15T19:39:20.900+00:00",
    "updateTime": "2024-12-04T03:59:46.864+00:00",
    "isDelete": 0,
    "title": "Men's All Over Santa Claus Print Round Neck Sweatshirt, Regular Fit Casual Long Sleeve Pullover for Fall & Winter, Men's Clothes for Daily Wear",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/87e84dcadd8148979f64502750da5ad4~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$16.14",
    "soldNum": 0,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:34:15.897+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "0.00",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/87e84dcadd8148979f64502750da5ad4%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/87e84dcadd8148979f64502750da5ad4~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/faecc93029b145efae382638e0438c6f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/94d400ec98a544adb9094b060fbe637a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1c614c38fa3743e28229f38008033d5a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/2f82ef234cda493bb9383a084c9a398e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/95b79dfe590446d6b4341babae515129~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/92ca270b2c234550b712d1cf3427b826~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/9d57f8647c794f5db0233587cc2a843b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.0496678344415422,
    "manualFactors": 1,
    "earnPer": "2.260000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729946502397399889",
    "createTime": "2024-11-20T20:15:33.741+00:00",
    "updateTime": "2024-12-04T04:01:54.188+00:00",
    "isDelete": 0,
    "title": "CURVZY Plus Size Houndstooth Print Button Pocket Decor Dress, Casual Long Sleeve Collared Short Dress for Fall & Winter, Women's Clothes for Daily Wear",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3b7a6f95af97467c84c521aef4a267c8~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$16.99",
    "soldNum": 23,
    "isApply": 1,
    "totalRate": "25.000000",
    "openRate": "15.0",
    "finishRate": "22.0",
    "lastTime": "2024-11-22T02:34:34.866+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "3.91",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/dcc98172693a4585be3c6e806c30889a%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/dcc98172693a4585be3c6e806c30889a~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ea419ad651174611b00e2988c3d38f06~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1b033f39535d4c4aae9682988303969d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/f461793685cd4987af887b28d69309c5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/70e97e6efc4a47718abf656946375a36~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e8413fb32e144e63a215a935acbfd582~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 3,
    "isUpEs": 1,
    "sortValue": 1.0514038941674348,
    "manualFactors": 1,
    "earnPer": "3.740000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729923097682154187",
    "createTime": "2024-11-20T20:15:29.120+00:00",
    "updateTime": "2024-12-04T03:57:27.745+00:00",
    "isDelete": 0,
    "title": "YOZY Women's Plain Button Front Ribbed Tee, Casual Short Sleeve Round Neck T-shirt for Daily Wear, Ladies Clothes for All Seasons",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8797c0c357c441b7908dca5e114ce8e3~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$6.79",
    "soldNum": 57,
    "isApply": 1,
    "totalRate": "12.000000",
    "openRate": "12.0",
    "finishRate": "11.0",
    "lastTime": "2024-11-22T02:33:56.907+00:00",
    "url": null,
    "daySoldNum": 7,
    "daySoldAmount": "47.53",
    "soldAmount": "3.87",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/8797c0c357c441b7908dca5e114ce8e3%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8797c0c357c441b7908dca5e114ce8e3~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e71fa42699744b35b137b9ef8a19d064~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/d816d617ea974fe081d6220541bd1071~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/eec785ef4a264be1a1d8e514cfeb9910~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ea7cd5b7f9b94c9cabe77ded5738dda5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/19ea7ca1fcf54e0285e8fa1832bb9109~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c85a63be0a71494ea5d452545c41bae8~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c6a7a89f6ac7466e96526aee7868eae8~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/42a8cd771f534c899bee922537c294b9~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 49,
    "isUpEs": 1,
    "sortValue": 1.0544582685753299,
    "manualFactors": 1,
    "earnPer": "0.750000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729923097093509835",
    "createTime": "2024-11-20T20:15:29.060+00:00",
    "updateTime": "2024-12-04T03:57:24.928+00:00",
    "isDelete": 0,
    "title": "YOZY Women's Solid Button Pocket Zip Up Hooded Jacket, Casual Long Sleeve Waterproof Windproof Outerwear for Fall & Winter, Ladies Clothes for Daily Wear",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/47e40bc9e6a84b738909219cba2aa03d~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$19.56",
    "soldNum": 0,
    "isApply": 1,
    "totalRate": "12.000000",
    "openRate": "12.0",
    "finishRate": "11.0",
    "lastTime": "2024-11-22T02:33:56.907+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "0.00",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/11ec9c2d735641689502f1bbec7f5123%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/11ec9c2d735641689502f1bbec7f5123~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/49f5eadb9f3f4e4e893c538d4c056ba8~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b2565bd2be82462db3a9c763f65c827d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/7b524b9de9e34742b135d1c264fdcdda~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0f1b9a5a6b984ce2be767ca530c42197~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a01110f8780b43dfb2e1ae742eff7af6~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/ac47425b06074b0b89068463794c470b~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.0545076279651469,
    "manualFactors": 1,
    "earnPer": "2.150000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729947758854902218",
    "createTime": "2024-11-19T19:40:29.730+00:00",
    "updateTime": "2024-12-04T04:02:23.595+00:00",
    "isDelete": 0,
    "title": "Floral Pattern Phone Case, Magnetic Phone Protective Cover, Phone Accessories Compatible with iPhone 16 15 14 13 Pro Max",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e4e10e4e65bb4e678845e497943b6531~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$12.73",
    "soldNum": 0,
    "isApply": 1,
    "totalRate": "15.000000",
    "openRate": "12.0",
    "finishRate": "14.0",
    "lastTime": "2024-11-22T02:34:34.867+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "0.00",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/e4e10e4e65bb4e678845e497943b6531%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e4e10e4e65bb4e678845e497943b6531~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e579532e2d9544b19fe40c538b2876b6~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b59e05374cac48a09752656977158545~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/06172e1718a346689eb27bb1eaedc1b6~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/0f833787c34541649da039670ac6a967~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.0571166993820988,
    "manualFactors": 1,
    "earnPer": "1.780000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729923098405343947",
    "createTime": "2024-11-20T20:15:29.162+00:00",
    "updateTime": "2024-12-04T03:57:29.517+00:00",
    "isDelete": 0,
    "title": "YOZY Women's Plain Ruched Off Shoulder Tee, Casual Long Sleeve T-Shirt for Spring & Fall, Women's Top for Daily Wear",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a9c07bae9420405fbc887262cbc486e5~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$8.66",
    "soldNum": 25,
    "isApply": 1,
    "totalRate": "12.000000",
    "openRate": "12.0",
    "finishRate": "11.0",
    "lastTime": "2024-11-22T02:33:56.907+00:00",
    "url": null,
    "daySoldNum": 2,
    "daySoldAmount": "17.32",
    "soldAmount": "2.17",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/a9c07bae9420405fbc887262cbc486e5%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a9c07bae9420405fbc887262cbc486e5~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8a81ebabadf44994aa2600238d18ca8d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/8c7a15a6028b42f09311a0fe16ebb429~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/a5453782bcc6475b91d42e52f9146baa~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/02e208707f4d4848aee14c5a6191abb4~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/cf8e88eeeab44f09982e3e511d34546f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/3fe37c96017b4f90a167f70017ba58c6~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 14,
    "isUpEs": 1,
    "sortValue": 1.0575820759691361,
    "manualFactors": 1,
    "earnPer": "0.950000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  },
  {
    "productId": "1729923103035724491",
    "createTime": "2024-11-20T20:15:29.243+00:00",
    "updateTime": "2024-12-04T03:57:33.605+00:00",
    "isDelete": 0,
    "title": "YOZY Women's Colorblock Figure & Star Print Raglan Sleeve Tee, Casual Sheer Half Sleeve Round Neck T-shirt for Summer, Fashion Women's Top for Daily Wear",
    "image": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/58d914125508465c963c50b8d0aa074f~tplv-dx0w9n1ysr-resize-jpeg:200:200.jpeg?from=1826719393",
    "price": "$11.04",
    "soldNum": 33,
    "isApply": 1,
    "totalRate": "12.000000",
    "openRate": "12.0",
    "finishRate": "11.0",
    "lastTime": "2024-11-22T02:33:56.907+00:00",
    "url": null,
    "daySoldNum": 0,
    "daySoldAmount": "0.00",
    "soldAmount": "3.64",
    "alyImage": "https://anystarr-web-image.oss-ap-southeast-1.aliyuncs.com/58d914125508465c963c50b8d0aa074f%7Etplv-dx0w9n1ysr-resize-jpeg%3A600%3A600.jpeg%3Ffrom%3D520841845",
    "images": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/58d914125508465c963c50b8d0aa074f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/eab038ab5bac4ea6be19f9febc586f5d~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/acb9950f165843c5b85bdb412c2c86fa~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6559f0aac9dc44d3ba90381bf94ddb4f~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/eb3672792f214624b7a6dafe93efa80e~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p19-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1198e266965a46c5be5c42c356368b50~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/b868923311874ae4b5d797d442e406fd~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/35f3c97b775b4952b1a06eaa6c9a09b4~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393|https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/cbdccd62950c450dad2b63b01c7683cc~tplv-dx0w9n1ysr-resize-jpeg:800:800.jpeg?from=1826719393",
    "alyImages": null,
    "day7SoldNum": 0,
    "isUpEs": 1,
    "sortValue": 1.0575876841308565,
    "manualFactors": 1,
    "earnPer": "1.210000",
    "collect": false,
    "collectId": null,
    "needApplyLink": true
  }
];
let category1IdRef;
let pageRef = 1;
let back = false;
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

  const historyRef = useRef(false);

  const getProdList = (searchNameRe, searchType, searchSort) => {
    // setProdList(prodListMock);
    if (loading) return; // 检查是否正在加载或没有更多数据

    let nowPage = searchNameRe ? 1 : page;

    setLoading(true);
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
          data = prodList.concat(resp.data.list.records);
        }
        setProdList(data.filter(item => {
          if (!item.lyImage && !item.alyImages && !item.images && !item.image){
            return false;
          }
          return true;
        }));
      }
    }).finally(() => {
      setLoading(false);
      setPageLoading(false);
    }).catch(e=>{
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
  }, [loading]);

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
                <HomeCard key={item.productId} item={item} />
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
