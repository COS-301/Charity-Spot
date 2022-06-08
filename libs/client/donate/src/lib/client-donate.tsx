import styles from './client-donate.module.css';
import './donatee.css'
import { FaHistory,FaDonate,FaPen,FaUserAlt,FaEdit,FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import  userprofile from '../../../shared/assets/userprofile.png'

import { getCookie, setCookie } from 'typescript-cookie'

import ItemHistory from './item-history'

let IdCookie = getCookie('ID');

/*async function uploadImageAPICall(ImageBase64 : any){
    
  const query = (`query {
    uploadImage(base64: "${ImageBase64}"){
      ID
    }
  }`);

  let All_data = "";
  
  await fetch('http://localhost:3333/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query
      })
      }).then(r => r.json())
        .then((data) => 
            All_data = data
        );
            
  console.log(JSON.stringify(All_data));

}*/

async function uploadItemAPICall(Name : string, Quantity : string, Category : string, Condition : string, Description : string, Base64Img : any){
  
  if(Base64Img == undefined){
    Base64Img = "undefined";
  }

  const query = `
  query{
    donate(
      userID: "${IdCookie}", 
      name: "${Name}", 
      quantity: ${Quantity}, 
      category: "${Category}", 
      condition: "${Condition}", 
      descr: "${Description}", 
      picture: "${Base64Img}", 
      pic_format: "jpg"){
      Name
    }
  }
  `;

  let All_data = "";

  await fetch('http://localhost:3333/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query
      })
      }).then(r => r.json())
        .then((data) => 
            All_data = data
        );

    
}

async function historyData() {
  const query = `
    donateHistory(id: "${IdCookie}"){
      Donations{
        Name
        Quantity
        Quality
        Category
        Picture
        Description
      }
    }
  `;

  let act_data = "";
  
  await fetch('http://localhost:3333/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query
      })
      }).then(r => r.json())
        .then((data) => 
            act_data = data
        );
            

  /**
   * EXPECT SOMETHING LIKE: 
   * {
        "data": {
          "donateHistory": {
            "Donations": [
              {
                "Name": "donation",
                "Quantity": 5,
                "Quality": "NEW",
                "Category": "FOOD",
                "Picture": "picture.png_base64",
                "Description": "Description here"
              },
              {
                "Name": "donation2",
                "Quantity": 3,
                "Quality": "NEW",
                "Category": "FOOD",
                "Picture": "picture2.png_base64",
                "Description": "Description here"
              },
              
              etc... for the ID you provided
            ]
          }
        }
      }
   *
      FROM THE API

      you can take over from here
        */      

  console.log(JSON.stringify(act_data));
}

/* eslint-disable-next-line */
//export interface ClientDonateProps {}
//export function ClientDonate(props: ClientDonateProps) {
export function ClientDonate() {

  const [IName, setIName] = useState('');
  const [IQuan,setIQuan] = useState('');
  const [ICat, setICat] = useState('Food');
  const [ICond,setICond] = useState('New');
  const [IDesc, setIDesc] = useState('');
  

  const [imageUpload, setImageUpload] = useState<File>();
  const [imageURL, setImageURL] = useState('');

  /*const uploadImage = () => {

    alert("Image uploaded to Firebase!");

    if(imageUpload){
      getBase64(imageUpload).then((data) => { uploadImageAPICall(data); });
    }


  };*/

  async function getBase64(file : File){

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  }


  const hanndlesubmit = async () =>{

    /*console.log(IName);
    console.log(IQuan);
    console.log(ICat);
    console.log(ICond);
    console.log(IDesc);*/

    let imgBase64 = undefined;

    if(imageUpload){
      imgBase64 = await getBase64(imageUpload);
    }

    await uploadItemAPICall(IName, IQuan, ICat, ICond, IDesc, imgBase64);

    (document.getElementById("mainDonateForm") as HTMLFormElement)!.reset();
    setImageURL("");

  }

return (

<div>
<div className="wrapper2">
<br/><br/>
  <input type ="radio" name="slider" id='donate1'  defaultChecked></input>
  <input type ="radio" name="slider" id='history1' ></input>
  {/* <input type ="radio" name="slider" id='code' ></input>
  <input type ="radio" name="slider" id='help' ></input> */}
  <nav>
    <label htmlFor= "donate1" className='donate1'><FaDonate/> Donate  </label>
    <label htmlFor= "history1" className='history1'> <FaHistory/> History </label>
    <div className='slider'></div>
  </nav>
  <section>
    <div className='content content-1'>
      <div className='title'><h1>Donate</h1></div>

                    <div className='donate-main'>

                      <div className='donate-left'>
                      <div className='item-pic'>
                        <img src={imageURL} alt="" id="donation-pic"/>
                      </div>
                      </div>
                      <div className='donate-right'>
                        <br/><br/>
                        <div className='donater'>
                          <form id = "mainDonateForm" onSubmit={(e) => { e.preventDefault(); hanndlesubmit();}}>
                            <div className='donate-box1'>
                              {/* <label htmlFor=''>OrgName</label><br/> */}
                              <input className="din1" type ="text" placeholder='Name' onChange ={(e)=>{setIName(e.target.value)}}></input>  
                               <FaPen color='#1458b3'/>
                            </div>
                            <div className='donate-box2'>
                              {/* <label htmlFor=''>Email</label> */}
                              <input className="din2" type ="number" min="1" placeholder='Quantity' onChange ={(e)=>{setIQuan(e.target.value)}}></input> 
                              <FaPen color='#1458b3'/>
                            </div>  
                            
                            <div className='donate-box3'>
                              {/* <label htmlFor=''>Address</label> */}
                              <select name="orgs" className='din3' onChange ={(e)=>{setICat(e.target.value)}}>
                                    <option value="Food">Food Item</option>
                                    <option value="Clothes">Clothing</option>  
                                    <option value="Tech">Tech (phone,laptop,etc..)</option> 
                                    <option value="Stationery">Stationery (books,pencils,etc..)</option> 
                                    <option value="Hygiene">Hygiene (soap,pads,etc..)</option> 
                                    <option value="Furniture">Furniture (Tv,desk,etc..)</option> 
                                    <option value="Kitchen">Kitchen (kettle,toaster,etc..)</option> 
                                </select>                                    
                             
                              <FaPen color='#1458b3'/>
                            </div>                                
                            <div className='donate-box4'>
                              {/* <label htmlFor=''>Org Password</label> */}
                              <select name="orgs"   className='din4' onChange ={(e)=>{setICond(e.target.value)}}>
                                    <option value="New">New</option>
                                    <option value="Used">Used</option>  
                                </select>                                       
                             
                              <FaPen color='#1458b3'/>
                            </div>      
                            <div className='donate-box5'>
                              {/* <label htmlFor=''>confirm password</label> */}
                              <textarea className="din5" rows={1}  placeholder='Item(s) Description' onChange ={(e)=>{setIDesc(e.target.value)}}></textarea> 
                              
                            </div>

                            <div>

                              <input type="file"
                                onChange={(e) => {

                                  if(!e.target.files) return;
                                  setImageUpload(e.target.files[0])
                                  setImageURL(URL.createObjectURL(e.target.files[0]));

                                }}/>

                            </div>

                            <br></br>

                            <input id='dnt_but'type="submit" value="Donate"/>   
                            <input id='clr_but'type="button" onClick={(e) => { 
                              e.preventDefault(); 
                              (document.getElementById("mainDonateForm") as HTMLFormElement)!.reset();
                              setImageURL("");}} 
                              value="Clear"/>                                                                                    
                          </form>

                          {/*Test code for file upload please feel free to remove

                            <div>
                              <br></br>

                              <input type="file"
                              onChange={(e) => {

                                if(!e.target.files) return;
                                setImageUpload(e.target.files[0])
                                setImageURL(URL.createObjectURL(e.target.files[0]));

                              }}/>

                              <button onClick={uploadImage}>Upload Image</button>

                            </div>

                          {/*End of test code for file upload*/}

                        </div>  
                      </div>
                  </div>
                </div>


  
    <div className='content content-2'>
           <div className='title'><h1>History</h1></div>
           <ItemHistory key={imageURL}></ItemHistory>
           {/*<div className='rapper'>
                  <div className='collapsible'>
                    <input type ='checkbox' id = 'collapsible-head'></input>
                    <label htmlFor='collapsible-head'>Levis Leather Jacket <FaArrowRight/></label>
  
                    <div className='collapsible-text'><br/>
                    <div className='collapseleft'>
                     <img src={userprofile} alt="" id="profile-pic"/>
                    </div>
                    <div className='collapseright'>
                      <ListGroup variant="flush" >
                        <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Name: Levis Leather Jacket</ListGroup.Item>
                          <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px', color: '#104283' }}>Quantity: 5 </ListGroup.Item>
                          <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Category: Clothing </ListGroup.Item>
                          <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Condition: Old</ListGroup.Item>
                          <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Description: Trucker Vintage jackets</ListGroup.Item>
                      </ListGroup>
                      </div>
                    </div>
                  </div>
             </div>
             <div className='rapper'>
                  <div className='collapsible'>
                    <input type ='checkbox' id = 'collapsible-head1'></input>
                    <label htmlFor='collapsible-head1'>Bread <FaArrowRight/></label>
  
                    <div className='collapsible-text'><br/>
                    <div className='collapseleft'>
                     <img src={userprofile} alt="" id="profile-pic"/>
                    </div>
                    <div className='collapseright'>
                      <ListGroup variant="flush" >
                        <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Name: Bread</ListGroup.Item>
                          <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px', color: '#104283' }}>Quantity: 1 </ListGroup.Item>
                          <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Category: Food </ListGroup.Item>
                          <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Condition: New</ListGroup.Item>
                          <ListGroup.Item style={{ backgroundColor: 'transparent', height: '70px' , color: '#104283'}}>Description: Brown whole wheat bread</ListGroup.Item>
                      </ListGroup>
                      </div>
                    </div>
                  </div>
                            </div>*/}
             
                
  </div>
  </section>
</div>   
 
</div>
  );
}

export default ClientDonate;
