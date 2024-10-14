import styles from "./index.module.scss";
import {useEffect, useState} from "react";
import {Input, Menu} from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import SizeBox from "@/components/SizeBox";

function getItem(label, key, icon, children, type, body) {
  return {
    key,
    icon,
    children,
    label,
    type,
    body
  };
}

const HelpCenter = () =>{
  const [isClient, setIsClient] = useState(false);
  const [currentIndex, setCurrentIndex] = useState("0");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Show a loading indicator or null during server-side rendering
  }

  const items = [
    getItem('Welcome', '0', <HelpCenterIcon id={8} />, null),
    getItem("New Influencers Guidence", "1",  <HelpCenterIcon id={3} />, [
      getItem('1.1 What is anyStarr ', '1.1', <HelpCenterIcon id={6} />, null, null, "anyStarr is a comprehensive TAP Agency, specializing in short video sales and live-stream sales. Connecting creators with a diverse range of high-potential, best-selling products. To date, anyStarr has successfully partnered with leading U.S. cross-border sellers, helping scale their TikTok shops from the ground up into thriving businesses, while collaborating with over 10 million creators globally."),
    ]),
    getItem("Q&A for Accounts", "2",  <HelpCenterIcon id={16} />, [
      getItem('2.1 What private information will you get? ', '0.1', <HelpCenterIcon id={9} />, null, null, "After linking your TikTok account, we'll collect your basic information, profile details, and your video status to display on your anyStarr user profile. You can also manage your permissions in the user settings."),
    ]),
    getItem("Q&A for Samples", "3", <HelpCenterIcon id={15} />, [
      getItem('3.1 What can I do if I have reached the sample limit?', '3.1', <HelpCenterIcon id={10} />, null, null, "Due to the sample request conditions established by TikTok, we submit a weekly whitelist to them. Please feel free to reach out to us, and we'll add you to the whitelist. You can expect to receive a link to a sample you can request within 4-5 days."),
      getItem('3.2 What can I do if I have no sample option?', '3.2', <HelpCenterIcon id={11} />, null, null, "We've enabled the sample option for all creators to help with applications. If you're not seeing the sample option, it may be due to TikTok's policy, which sets the sample eligibility based on creators' GMV and performance. If you'd like to be added to the whitelist, feel free to contact us directly."),
      getItem('3.3 What can I do if the link is not working?', '3.3', <HelpCenterIcon id={12} />, null, null, <div>Here are two ways: <br/> 1. If the link is not clickable on the chat, please copy the link and open it in your own browser (Chrome/Safari) to have another try. <br/>2. If the product is off the shelf, please freely contact us. </div>),
      getItem('3.4 What can I do if the samples are unavailable?', '3.4', <HelpCenterIcon id={13} />, null, null, "If a product is listed as out of stock, the seller will restock within 48 hours if the item is out of stock. If it takes longer than 48 hours, please freely contact us. If the product is unavailable, we recommend reaching out to the supplier or exploring other similar products."),
    ]),
    getItem("Q&A for Products", "4",  <HelpCenterIcon id={16} />, [
      getItem('4.1 How do I know the quality of products?', '4.1', <HelpCenterIcon id={17} />, null, null, "You can directly assess the quality with suppliers or check on customer reviews of the product."),
      getItem('4.2 Why did I receive the wrong product/not mine?', '4.2', <HelpCenterIcon id={18} />, null, null, "There are two reasons: 1. The seller sent the wrong product, please freely contact us or the seller for a replacement. 2. You may check your fulfillment list on TikTok to confirm since you may have authorized us to automatically send the sample."),
      getItem('4.3 Why did I receive the product fulfillment message from you?', '4.3', <HelpCenterIcon id={19} />, null, null, "In this case, as we collaborate with the supplier who sends you samples, please feel free to contact us with any requests."),
      getItem('4.4 What can I do if the product is broken?', '4.4', <HelpCenterIcon id={20} />, null, null, "If the package is broken, please freely contact the carrier or the seller. If the product is broken, please freely contact the seller."),
    ]),
    getItem("Q&A for Commissions", "5", <HelpCenterIcon id={1} />, [
      getItem('5.1 Why I get low rate commissions and increase comissions?', '5.1', <HelpCenterIcon id={2} />, null, null, "The commission rate might be lower this time because the rate from your previous collaboration with other sellers was higher. If you'd like to increase the commission rate, please contact us, and we’ll assist you in adjusting it."),
      getItem('5.2 How to get an ad code?', '5.2', <HelpCenterIcon id={3} />, null, null, <div>
        <div>Typically, we require your ad code to help boost your video.</div>
        <div>The steps are fairly simple:</div>
        <div>Step 1: Please go to the video on their page to be promote</div>
        <div>Step 2: Click the ••• below the “comment” button</div>
        <div>-Select “Ad settings”</div>
        <div>-Toggle Ad authorization to “On” and agree to the terms</div>
        <div>-Click Generate code</div>
        <div>-And copy > share the code with you, the advertiser</div>
        <div>It is recommend 30 or 60 days depending on what the creator agrees to.</div>
        <img src={"example.jpeg"} />
      </div>),
    ]),
    getItem("Q&A for Logistics", "6", <HelpCenterIcon id={4} />, [
      getItem('6.1 Why haven\'t I received my package?', '6.1', <HelpCenterIcon id={5} />, null, null, "Please kindly check your sample's status. If it hasn't been sent out within 72 hours, please freely contact us. If it shows delivery or not updated for a long time, we suggest contacting the carrier to check the package first."),
    ]),
  ];


  const onMenuClick = (e) => {
    window.location.href = `#${e.key}`;
  };

  return <div className={styles.help_page}>
    <div className={styles.nav_wrap}>
      <Menu
        onClick={onMenuClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        mode={"inline"}
        items={items}
      />
    </div>
    <div className={styles.body_wrap}>
      <WelcomeComp items={items}></WelcomeComp>
      <SizeBox h={40}></SizeBox>
      <div className={styles.normal_wrap}>
        {
          items.map(item=>{
           return  item.label !== "Welcome" && (
                <div>
                  <SectionTitle1 id={item.key}>
                    {item.label}
                  </SectionTitle1>
                  {
                    item.children?.map(child=>{
                      return <>
                        <SectionTitle2 id={child.key}>
                          {child.label}
                        </SectionTitle2>
                        <SectionTitle3>
                          {child.body}
                        </SectionTitle3>
                      </>;
                    })
                  }
                  <SizeBox h={50}></SizeBox>
                </div>
              );
          })
        }
        <SizeBox h={100}></SizeBox>
      </div>
    </div>
  </div>;
};


const WelcomeComp = ({items}) =>{
  const topics = [
    { title: 'New Influencers Guidence', key:"1", description: 'What is anyStarr', icon: 'https://static.xx.fbcdn.net/assets/?revision=1431132240730458&name=Illustrations-Get-Started&density=1' },
    { title: 'Q&A for Accounts', key:"2", description: 'What private information will you get?', icon: 'https://static.xx.fbcdn.net/assets/?revision=1431132240730458&name=Illustrations-Security&density=1' },
    { title: 'Q&A for Samples', key:"3", description: 'What can I do if I have reached the sample limit?', icon: 'https://static.xx.fbcdn.net/assets/?revision=1431132240730458&name=Illustrations-Backup&density=1' },
    { title: 'Q&A for Products', key:"4", description: 'How do I know the quality of products?', icon: 'https://static.xx.fbcdn.net/assets/?revision=1431132240730458&name=Illustrations-Backup&density=1' },
    { title: 'Q&A for Commissions', key:"5", description: 'Why I get low rate commissions and increase comissions?\n', icon: 'https://static.xx.fbcdn.net/assets/?revision=1431132240730458&name=Illustrations-Backup&density=1' },
    { title: 'Q&A for Logistics', key:"6", description: 'Why haven\'t I received my package?', icon: 'https://static.xx.fbcdn.net/assets/?revision=1431132240730458&name=Illustrations-Backup&density=1' },
  ];

  const onMenuClick = (e) => {
    window.location.href = `#${e.key}`;
  };

  return (
    <div id={"0"} className={styles.welcome_container}>
      <h1 className={styles.welcome_heading}>How can we help you?</h1>
      <div className={styles.welcome_search}>
        <Input type={"text"} placeholder={"Search help articles..."} className={styles.welcome_searchInput} />
      </div>
      <h4 className={styles.welcome_heading}>Popular Topics</h4>
      <div className={styles.welcome_topics}>
        {topics.map((topic, index) => (
          <div onClick={()=>onMenuClick(topic)} key={index} className={styles.welcome_card}>
            <img src={topic.icon} alt={topic.title} className={styles.welcome_icon} />
            <h3 className={styles.welcome_cardTitle}>{topic.title}</h3>
            <p className={styles.welcome_cardDescription}>{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


const SectionTitle1 = ({id,  children}) =>{
  return <div id={id} className={styles.section_title_1}>{children}</div>;
};

const SectionTitle2 = ({id,  children}) =>{
  return <div id={id} className={styles.section_title_2}>{children}</div>;
};

const SectionTitle3 = ({id, children}) =>{
  return <div id={id} className={styles.section_title_3}>{children}</div>;
};

const HelpCenterIcon = ({id}) =>{
  return <img src={`helpCenter/${id}.png`} style={{marginRight:"5px"}} width={25} height={25}/>;
};

export default HelpCenter;
