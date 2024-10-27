import styles from "./index.module.scss";
import {useEffect, useRef, useState} from "react";
import {APIGetCategoryFirst} from "@/api";
const Category2List = ({onCheckLevel2, currentCategoryId, category2List}) =>{
  const carouselRef = useRef(null);
  const onStop = useRef(false);
  const lastScrollPos = useRef(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollPosition = 0;
    const scroll = () => {
      if (carousel) {
        scrollPosition += 1; // 滚动速度
        if (scrollPosition >= carousel.scrollWidth / 2) {
          scrollPosition = 0; // 重置位置形成循环
        }
        carousel.scrollLeft = scrollPosition;
      }
    };

    const interval = setInterval(()=>{
      if (!onStop.current){
        scroll();
      }
    }, 40); // 调整滚动速度

    return () => clearInterval(interval);
  }, []);

  return <div>
    <div onMouseEnter={()=>{
      onStop.current = true;
    }} onMouseLeave={()=>{
      onStop.current = false;
      lastScrollPos.current = carouselRef.current.scrollLeft;
    }} id={"carouselRef"} className={styles.category_wrap} ref={carouselRef}>
      {category2List.concat(category2List).map((item, index) => (
        <div onClick={()=>onCheckLevel2(item.categoryId)} key={index} className={`${styles.item_view} ${item.categoryId === currentCategoryId ? styles.active : ""}`}>
          {item.name}
        </div>
      ))}
    </div>
  </div>;
};

export default Category2List;
