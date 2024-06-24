import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify'


export default function Visualdocs({ Last_patient, doctor }) {
    const [data, setdata] = useState([]);
    const [images, setimages] = useState(null);
    const[reload,setreload]=useState(true)


    const submit_docs = async (e) => {
        setreload(prev =>!prev)
        e.preventDefault();
        if (images) {
            const formData = new FormData();
            for (let i = 0; i < images.length; i++) {
                formData.append('image', images[i]);
            }
            
            formData.append('patient', Last_patient);
            formData.append('doctor', doctor);

            try {
                const fetchdata = await fetch('http://localhost:5000/upload_file', { method: 'post', body: formData });
                if (fetchdata.ok) {
                    toast.success("The visual data have been uploaded successfully", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });;
                } else {
                    alert('Error uploading data. Please check your files.');
                }
                setimages(null);
            } catch (error) {
                alert('Error from server');
            }
        } else {
            alert('Error in uploading data. Please check your files.');
        }
        setreload(prev =>!prev)
    };

    useEffect(() => {
        const get_img = async () => {
            try {
                const send_req = await fetch('http://localhost:5000/get_info_visual_data', { method: 'get', headers: { patid: Last_patient } });
                const d_send_req = await send_req.json();
                if (d_send_req.ultresult.length > 0) {
                    setdata(d_send_req.ultresult);
                } else {
                    console.log('No data yet');
                    setdata([]);
                }
            } catch (error) {
                console.error('Error fetching visual data:', error);
            }
        };

        get_img();
    }, [Last_patient,reload]); 
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };   
    return (
        <>
            {data.length > 0 ? (
                data.map((dataa, index) => (
                    <div key={dataa.Date_insertion}>
                        <div className="date_visual_docs">{formatDate(dataa.Date_insertion)}</div>
                        <div className={'visual_docs visual_docs_' + index} style={{ overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', position: 'relative' }}>
                            {dataa.image_name.map((imageName, i) => (
                                <div className="small" key={i}>
                                    <img src={'http://localhost:5000/visual_data/' + imageName} alt="" onClick={() => { window.open('http://localhost:5000/visual_data/' + imageName, '_blank') }} />
                                </div>
                            ))}
                           
                        </div>
                    </div>
                ))
            ) : (
                <div style={{display:'flex',alignContent:"center",justifyContent:'center'}}>
                    <p>NO DATA YET</p>
                </div>
            )}
            <div className="img_upload">
                <form>

                    {images === null && (
                      <div className='upload_button_div'><input type="file" accept="image/*" className="file-input" multiple onChange={(ev) => setimages(ev.target.files)} /></div> 
                    ) }


                    {images !== null ? (
                        <button className="upload-button" onClick={submit_docs}>
                            Upload Image
                        </button>
                    ) : null}
                </form>
            </div>
        </>
    );
}
