import React, { useState, useEffect } from 'react';
import { TreeSelect } from 'antd';
import {APIGetCategoryFirst, APIGetCategorySecond} from "@/api";

let level1 = [
  {
    "categoryId": 600001,
    "createTime": "2024-07-06T18:30:01.102+00:00",
    "updateTime": "2024-10-26T03:00:00.332+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_600001",
    "isLeaf": 0,
    "level": 1,
    "name": "Home Supplies",
    "nameKey": "magellan_600001",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 600024,
    "createTime": "2024-07-06T18:30:03.662+00:00",
    "updateTime": "2024-10-26T03:00:10.963+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_600024",
    "isLeaf": 0,
    "level": 1,
    "name": "Kitchenware",
    "nameKey": "magellan_600024",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 600154,
    "createTime": "2024-07-06T18:30:06.333+00:00",
    "updateTime": "2024-10-26T03:00:23.614+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_600154",
    "isLeaf": 0,
    "level": 1,
    "name": "Textiles & Soft Furnishings",
    "nameKey": "magellan_600154",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 600942,
    "createTime": "2024-07-06T18:30:07.368+00:00",
    "updateTime": "2024-10-26T03:00:28.810+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_600942",
    "isLeaf": 0,
    "level": 1,
    "name": "Household Appliances",
    "nameKey": "magellan_600942",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 601152,
    "createTime": "2024-07-06T18:30:08.687+00:00",
    "updateTime": "2024-10-26T03:00:35.233+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_601152",
    "isLeaf": 0,
    "level": 1,
    "name": "Womenswear & Underwear",
    "nameKey": "magellan_601152",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 601303,
    "createTime": "2024-10-12T09:00:45.121+00:00",
    "updateTime": "2024-10-26T03:00:45.993+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_601303",
    "isLeaf": 0,
    "level": 1,
    "name": "Muslim Fashion",
    "nameKey": "magellan_601303",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 601352,
    "createTime": "2024-07-06T18:30:10.920+00:00",
    "updateTime": "2024-10-26T03:00:57.750+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_601352",
    "isLeaf": 0,
    "level": 1,
    "name": "Shoes",
    "nameKey": "magellan_601352",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 601450,
    "createTime": "2024-07-06T18:30:11.870+00:00",
    "updateTime": "2024-10-26T03:01:03.188+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_601450",
    "isLeaf": 0,
    "level": 1,
    "name": "Beauty & Personal Care",
    "nameKey": "magellan_601450",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 601739,
    "createTime": "2024-07-06T18:30:15.148+00:00",
    "updateTime": "2024-10-26T03:01:19.908+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_601739",
    "isLeaf": 0,
    "level": 1,
    "name": "Phones & Electronics",
    "nameKey": "magellan_601739",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 601755,
    "createTime": "2024-07-06T18:30:18.247+00:00",
    "updateTime": "2024-10-26T03:01:32.621+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_601755",
    "isLeaf": 0,
    "level": 1,
    "name": "Computers & Office Equipment",
    "nameKey": "magellan_601755",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 602118,
    "createTime": "2024-07-06T18:30:20.755+00:00",
    "updateTime": "2024-10-26T03:01:42.830+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_602118",
    "isLeaf": 0,
    "level": 1,
    "name": "Pet Supplies",
    "nameKey": "magellan_602118",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 602284,
    "createTime": "2024-07-06T18:30:24.238+00:00",
    "updateTime": "2024-10-26T03:01:59.598+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_602284",
    "isLeaf": 0,
    "level": 1,
    "name": "Baby & Maternity",
    "nameKey": "magellan_602284",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 603014,
    "createTime": "2024-07-06T18:30:26.991+00:00",
    "updateTime": "2024-10-26T03:02:12.557+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_603014",
    "isLeaf": 0,
    "level": 1,
    "name": "Sports & Outdoor",
    "nameKey": "magellan_603014",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 604206,
    "createTime": "2024-07-06T18:30:30.795+00:00",
    "updateTime": "2024-10-26T03:02:30.108+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_604206",
    "isLeaf": 0,
    "level": 1,
    "name": "Toys & Hobbies",
    "nameKey": "magellan_604206",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 604453,
    "createTime": "2024-07-06T18:30:33.378+00:00",
    "updateTime": "2024-10-26T03:02:41.611+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_604453",
    "isLeaf": 0,
    "level": 1,
    "name": "Furniture",
    "nameKey": "magellan_604453",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 604579,
    "createTime": "2024-07-06T18:30:34.697+00:00",
    "updateTime": "2024-10-26T03:02:48.185+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_604579",
    "isLeaf": 0,
    "level": 1,
    "name": "Tools & Hardware",
    "nameKey": "magellan_604579",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 604968,
    "createTime": "2024-07-06T18:30:36.936+00:00",
    "updateTime": "2024-10-26T03:02:59.703+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_604968",
    "isLeaf": 0,
    "level": 1,
    "name": "Home Improvement",
    "nameKey": "magellan_604968",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 605196,
    "createTime": "2024-07-06T18:30:39.448+00:00",
    "updateTime": "2024-10-26T03:03:12.373+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_605196",
    "isLeaf": 0,
    "level": 1,
    "name": "Automotive & Motorcycle",
    "nameKey": "magellan_605196",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 605248,
    "createTime": "2024-07-06T18:30:41.550+00:00",
    "updateTime": "2024-10-26T03:03:24.031+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_605248",
    "isLeaf": 0,
    "level": 1,
    "name": "Fashion Accessories",
    "nameKey": "magellan_605248",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 700437,
    "createTime": "2024-07-06T18:30:43.624+00:00",
    "updateTime": "2024-10-26T03:03:35.738+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_700437",
    "isLeaf": 0,
    "level": 1,
    "name": "Food & Beverages",
    "nameKey": "magellan_700437",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 700645,
    "createTime": "2024-07-06T18:30:45.531+00:00",
    "updateTime": "2024-10-26T03:03:44.868+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_700645",
    "isLeaf": 0,
    "level": 1,
    "name": "Health",
    "nameKey": "magellan_700645",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 801928,
    "createTime": "2024-07-06T18:30:46.305+00:00",
    "updateTime": "2024-10-26T03:03:49.739+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_801928",
    "isLeaf": 0,
    "level": 1,
    "name": "Books, Magazines & Audio",
    "nameKey": "magellan_801928",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 802184,
    "createTime": "2024-07-06T18:30:49.310+00:00",
    "updateTime": "2024-10-26T03:04:02.812+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_802184",
    "isLeaf": 0,
    "level": 1,
    "name": "Kids' Fashion",
    "nameKey": "magellan_802184",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 824328,
    "createTime": "2024-07-06T18:30:51.053+00:00",
    "updateTime": "2024-10-26T03:04:10.540+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_824328",
    "isLeaf": 0,
    "level": 1,
    "name": "Menswear & Underwear",
    "nameKey": "magellan_824328",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 824584,
    "createTime": "2024-07-06T18:30:52.719+00:00",
    "updateTime": "2024-10-26T03:04:19.173+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_824584",
    "isLeaf": 0,
    "level": 1,
    "name": "Luggage & Bags",
    "nameKey": "magellan_824584",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 856720,
    "createTime": "2024-07-06T18:30:54.339+00:00",
    "updateTime": "2024-10-26T03:04:26.966+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_856720",
    "isLeaf": 0,
    "level": 1,
    "name": "Pre-Owned",
    "nameKey": "magellan_856720",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 951432,
    "createTime": "2024-07-06T18:30:55.384+00:00",
    "updateTime": "2024-10-26T03:04:34.781+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_951432",
    "isLeaf": 0,
    "level": 1,
    "name": "Collectibles",
    "nameKey": "magellan_951432",
    "parentId": 0,
    "sequence": 0
  },
  {
    "categoryId": 953224,
    "createTime": "2024-07-06T18:30:56.942+00:00",
    "updateTime": "2024-10-26T03:04:41.210+00:00",
    "isDelete": 0,
    "desc": "desc",
    "descKey": "oec_product_category_desc_953224",
    "isLeaf": 0,
    "level": 1,
    "name": "Jewelry Accessories & Derivatives",
    "nameKey": "magellan_953224",
    "parentId": 0,
    "sequence": 0
  }
];

const CategoryTreeSelect = ({onCategoryChange, className, category1Id}) => {
  const [value, setValue] = useState(category1Id);
  const [treeData, setTreeData] = useState(level1.map(item=>{
    item.id = item.categoryId;
    item.title = item.name;
    item.value = item.categoryId;
    item.pId = 0;
    return item;
  }));


  useEffect(()=>{
    getLevel1ProList();
  }, []);

  const getLevel1ProList = () =>{
    APIGetCategoryFirst().then(resp=>{
      if (resp.data.result){
        setTreeData(resp.data.result.map(item=>{
          item.id = item.categoryId;
          item.title = item.name;
          item.value = item.categoryId;
          item.pId = 0;
          item.isLeaf = false;
          return item;
        }));
      }
    });
  };

  const getLevel2ListBy1Id = (category1Id, resolve) =>{
    if (!category1Id) return;
    APIGetCategorySecond({
      parentId:category1Id,
    }).then(resp=>{
      if (resp.data.result){
        const level2 = resp.data.result;
        const l2 = level2.map(item=>{
          item.id = item.categoryId;
          item.title = item.name;
          item.value = item.categoryId;
          item.pId = category1Id;
          item.isLeaf = false;
          return item;
        });
        setTreeData(
          treeData.concat(l2),
        );
        resolve(undefined);
      }
    }).finally(()=>{
      resolve(undefined);
    });
  };

  const getLevel3ListBy2Id = (category2Id, resolve) =>{
    if (!category2Id) return;
    APIGetCategorySecond({
      parentId:category2Id,
    }).then(resp=>{
      if (resp.data.result){
        const level3 = resp.data.result;
        const l3 = level3.map(item=>{
          item.id = item.categoryId;
          item.title = item.name;
          item.value = item.categoryId;
          item.pId = category2Id;
          item.isLeaf = true;
          return item;
        });
        setTreeData(
          treeData.concat(l3),
        );
        resolve(undefined);
      }
    }).finally(()=>{
      resolve(undefined);
    });
  };

  const onLoadData = (item) => new Promise((resolve) => {
       if (item.level === 1){
         getLevel2ListBy1Id(item.id, resolve);
       }
       if (item.level === 2){
         getLevel3ListBy2Id(item.id, resolve);
       }
    });
  const onChange = (newValue) => {
    setValue(newValue);
    onCategoryChange(newValue);
  };
  return (
    <TreeSelect
      treeDataSimpleMode
      allowClear
      className={className}
      value={value}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      placeholder={"Select category"}
      onChange={onChange}
      loadData={onLoadData}
      treeData={treeData}
    />
  );
};
export default CategoryTreeSelect;
