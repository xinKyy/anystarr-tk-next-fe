import styles from  '../income/index.module.scss';
import {Button, Form, Input, InputNumber, message, Spin, Switch} from "antd";
import {useEffect, useState} from "react";
import {APIChangeModAmount, APIGetModAmount} from "@/api";
import {
  closeGetMod,
  getPriceOne,
  getPriceThree,
  getPriceTwo, openGetMod,
  setCenterwallet,
  setModPriceone
} from "@/utils/walletConact";
import useDispatchAction from "@/hooks/useDisptachAction";
import {setWalletInfo} from "@/redux/actions/home";
import {connectWallet} from "@/utils/walletTools";
import {useSelector} from "react-redux";


const ModManagement = ()=>{
  const [isAdmin, setIsAdmin] = useState(false);
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [inputModAmount, setInputModAmount] = useState(0);
  const [newAddress, setNewAddress] = useState(null);
  const [priceOne, setPriceOne] = useState(null);
  const [priceTwo, setPriceTwo] = useState(null);
  const [priceThree, setPriceThree] = useState(null);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState({});
  const dispatchAction = useDispatchAction({ setWalletInfo });
  const walletInfo = useSelector(state => state.home.walletInfo.walletInfo);
  const changeModAmount = () =>{
    setLoading(true);
    APIChangeModAmount({
      totalAmount:inputModAmount
    }).then(resp=>{
      if (resp){
        message.success("修改成功！");
      }
    }).finally(()=>{
      APIGetModAmount().then(resp=>{
        setTotalAmount(resp.totalAmount);
      });
      setLoading(false);
    });
  };

  useEffect( async ()=>{
    await connectWallet(dispatchAction);
    APIGetModAmount().then(resp=>{
      setTotalAmount(resp.totalAmount);
    });
    getPrice();
  }, [loading]);

  const getPrice = () =>{
    let currentPrice = {};
    getPriceOne().then(resp=>{
      currentPrice.one = resp;
      setPrice({
        ...currentPrice,
        one:resp
      });
    });
    getPriceTwo().then(resp=>{
      currentPrice.two = resp;
      setPrice({
        ...currentPrice,
        two:resp
      });
    });
    getPriceThree().then(resp=>{
      currentPrice.three = resp;
      setPrice({
        ...currentPrice,
        three:resp
      });
    });
  };

  const changeNewAddress = () =>{
    setLoading(true);
    if (newAddress){
      setCenterwallet(newAddress).then(resp =>{
        message[resp.result ? "success" : "error"](resp.msg);
        setLoading(false);
      });
    }
  };

  const changePrice = (type)=>{
    setLoading(true);
    switch (type) {
      case 1:{
        if (priceOne){
          setModPriceone(priceOne).then(res=>{
            message[res.result ? "success" : "error"](res.msg);
            setLoading(false);
          });
        }
        break;
      }
      case 2:{
        if (priceTwo){
          setModPriceone(priceTwo).then(res=>{
            message[res.result ? "success" : "error"](res.msg);
            setLoading(false);
          });
        }
        break;
      }
      case 3:{
        if (priceThree){
          setModPriceone(priceThree).then(res=>{
            message[res.result ? "success" : "error"](res.msg);
            setLoading(false);
          });
        }
        break;
      }
    }
  };

  const changeGetMod = (v) => {
    setLoading(true);
    if (walletInfo.btnNowStatus){
      closeGetMod().then(resp=>{
        message[resp.result ? "success" : "error"](resp.msg);
        setLoading(false);
      });
    } else {
      openGetMod().then(resp=>{
        message[resp.result ? "success" : "error"](resp.msg);
        setLoading(false);
      });
    }
  };

  const login = () =>{
    if (account && account === "adminMod" && password && password === "adminModPass"){
      setIsAdmin(true);
    } else {
      message.error("账户或密码不正确");
    }
  };

  return <Spin style={{width:"100%", height:"100%"}} fullscreen spinning={loading}>
    <div className={styles.income_page}>


      {
        isAdmin ? <>
          <div className={styles.controller_wrap}>
            <div>当前代币剩余：{totalAmount}</div>
            <div className={styles.flex_wrap}>
              <Input
                placeholder={"请输入代币剩余量"}
                type={"number"}
                onChange={(v)=>setInputModAmount(v.target.value)}
              />
              <Button type={"primary"} onClick={changeModAmount}>修改代币剩余</Button>
            </div>
          </div>

          <div className={styles.controller_wrap}>
            <div>更换收款地址</div>
            <div className={styles.flex_wrap}>
              <Input
                placeholder={"请输入新的收款地址"}
                value={newAddress}
                onChange={(v)=>setNewAddress(v.target.value)}
              />
              <Button type={"primary"} onClick={changeNewAddress}>修改收款地址</Button>
            </div>
          </div>

          <div className={styles.controller_wrap}>
            <div>100-500价格控制，当前{price.one ?? 0}</div>
            <div className={styles.flex_wrap}>
              <Input
                placeholder={"请输入新的价格"}
                value={priceOne}
                type={"number"}
                onChange={(v)=>setPriceOne(v.target.value)}
              />
              <Button type={"primary"} onClick={()=>changePrice(1)}>修改新的价格</Button>
            </div>
          </div>

          <div className={styles.controller_wrap}>
            <div>600-1000价格控制，当前{price.two ?? 0}</div>
            <div className={styles.flex_wrap}>
              <Input
                placeholder={"请输入新的价格"}
                value={priceTwo}
                type={"number"}
                onChange={(v)=>setPriceTwo(v.target.value)}
              />
              <Button type={"primary"} onClick={()=>changePrice(2)}>修改新的价格</Button>
            </div>
          </div>

          <div className={styles.controller_wrap}>
            <div>1100-3000价格控制，当前{price.three ?? 0}</div>
            <div className={styles.flex_wrap}>
              <Input
                placeholder={"请输入新的价格"}
                value={priceThree}
                type={"number"}
                onChange={(v)=>setPriceThree(v.target.value)}
              />
              <Button type={"primary"} onClick={()=>changePrice(3)}>修改新的价格</Button>
            </div>
          </div>

          <div className={styles.controller_wrap}>
            <div>领取MOD按钮控制，当前状态：{walletInfo.btnNowStatus ? "开启中" : "已关闭"}</div>
            <div className={styles.flex_wrap}>
              <Switch checked={walletInfo.btnNowStatus} onChange={changeGetMod}></Switch>
            </div>
          </div>
        </> : <div className={styles.controller_wrap}>
          <div>管理员登录</div>
          <div className={styles.flex_wrap}>
            <div className={styles.flex_1}> 账户：</div> <Input
              placeholder={"请输入账户"}
              value={account}
              onChange={(v)=>setAccount(v.target.value)}
            />
          </div>
          <div className={styles.flex_wrap}>
            <div className={styles.flex_1}> 密码：</div> <Input.Password
            placeholder={"请输入密码"}
            value={password}
            onChange={(v)=>setPassword(v.target.value)}
          />
          </div>
          <Button style={{width:"200px", margin: "20px auto"}} type={"primary"} onClick={login}>登录</Button>
        </div>
      }

    </div>
  </Spin>;
};


export default ModManagement;
