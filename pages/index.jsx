import Head from 'next/head'
import {useState} from 'react';
import styles from "./index.module.css";


export default function Home() {

  //API 사용횟수 초기화
  const [count, setCounter] = useState(0);
  const [promptInput, setPromptInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(e) {
    e.preventDefault()

    try{
    if(count ==10){
      return console.log('reached your limit')
    }
      
    const response = await fetch("/api/prompt",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({prompt: promptInput})
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request faild with status: ${response.status}`);
    }

      setResult(data.result);
      setCounter(count+1);
      setPromptInput("");
    }catch(error){
      console.log(error);
      alert(error.message);
    }

  }

    
  
  return (
      <div className={styles.body}>
        <Head>
          <title>Create Next App</title>
          <link rel='icon' href='/favicon.ico'></link>
        </Head>
        <main className={styles.main}>
          <img src='/favicon.ico' className={styles.icon}/>
          <h3>Prompt API</h3>
          {/* <p>이 앱을 {count}번 사용했습니다.</p> */}
          <form onSubmit={onSubmit}>

            {/*input form*/}
            <input 
            type='text' 
            name='prompt'
            value={promptInput} 
            onChange={(e)=>{
              setPromptInput(e.target.value)
              console.log(promptInput)
            }}
            placeholder='질문을 입력하세요'/>

            {/*submit form*/}
            <input 
            type='submit' 
            value="Prompt input"   
            />
          </form>
          <div className={styles.result}>{result}</div>
        </main>
    </div>
  )
}