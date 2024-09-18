
// import { useEffect, useState } from "react";
// import style from "../Heading.module.css";
// import { format} from 'date-fns';

// const Headers = () => {
//     const [newDate ,usecurrentDate]=useState(new Date());

//     useEffect(()=>{
//        const TimeID = setInterval(()=>{
//         usecurrentDate(new Date(),1000);//run every 1 second auto run
//        })
//         });
    
//     return <>
//         <div className={style.heading}>
//             <h1 >LIST YOUR ITEM  </h1>
//             <h2> Date:  {newDate.toLocaleDateString()}</h2>
//             <h2>Time: {newDate.toLocaleTimeString()}</h2>
//         </div>

//     </>
// }

// export default Headers;