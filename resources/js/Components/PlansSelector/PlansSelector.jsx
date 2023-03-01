import React,{useState, useEffect} from 'react';
import Loader from '../Loader';
import { get } from '@/Utils/Ajax';

function PlansSelector({onSubmit,plan}) {

  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [period,setPeriod] = useState('monthly');
  const [planCheck, setPlanCheck] = useState(plan);


  useEffect(() => {
    setLoading(true);
      get("/plans").then(_plansResponse => {
        setLoading(false);
        setPlans(_plansResponse);
      });
    
  }, []);

  const onFeed = (outline)=>{

    setPlanCheck(outline.id);
    
    if(onSubmit){
      onSubmit(outline,period);
    }
    
  }
  
  const onInstallPeriod = (e) =>{

    setPeriod(e.target.innerText);
    setPlanCheck(null);

  }
  if(loading) {
    return <Loader />
  }

  return (
    <div className="plans">
      <div className="plans-header">
        <h2>Select Plan</h2>
        <div className="plans_btn">
          <a className={period == "monthly" ? "archor-active" : ''} onClick={(e)=>onInstallPeriod(e)}>monthly</a>
          /
          <a className={period == "annually" ? "archor-active" : ''} onClick={(e)=>onInstallPeriod(e)}>annually</a>
        </div>
      </div>
      <ul className="plans-title">
        {plans.map((scheme,index)=>{
          return <li key={index.toString()} className={`plan ${scheme.id == planCheck ? "plan-active" : ''}`} onClick={()=>onFeed(scheme)}>
            <input type="radio" name={scheme.name}  checked={scheme.id == planCheck} readOnly/>
            <div className='plan-info'>
              <div className="plan-store">
                <h2>{scheme.name}</h2>
                <div>
                  <span>{scheme.stores_limit} store </span>
                  <span> | {scheme.monthly_orders_limit <= 0 ? "unlimited" : scheme.monthly_orders_limit} orders per month</span>
                </div>
              </div>
              <div className="plan-price">
                <span>${(period == "monthly") ? Math.floor(scheme.price_per_month) : Math.round(scheme.price_per_year/12)}</span>
                <span>/ month</span>
              </div>
            </div>
          </li>
        })}
      </ul>
    </div>
  )
}

export default PlansSelector