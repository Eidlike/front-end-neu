import React, { useEffect, useState } from 'react';

export default function Visualdocs({ Last_patient, doctor }) {
    const [data, setdata] = useState([]);
    const [images, setimages] = useState(null);

    const submit_docs = async (e) => {
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
                    alert('Uploaded successfully');
                    window.location.reload();
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
    }, [Last_patient]);    
    return (
        <>
            {data.length > 0 ? (
                data.map((dataa, index) => (
                    <div key={dataa.Date_insertion}>
                        <div className="date_visual_docs">{dataa.Date_insertion}</div>
                        <div className={'visual_docs visual_docs_' + index} style={{ overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', position: 'relative' }}>
                            {dataa.image_name.map((imageName, i) => (
                                <div className="small" key={i}>
                                    <img src={'http://localhost:5000/' + imageName} alt="" onClick={() => { window.location.href = 'http://localhost:5000/' + imageName }} />
                                </div>
                            ))}
                           
                        </div>
                    </div>
                ))
            ) : (
                <div>
                    <p>NO DATA YET</p>
                </div>
            )}
            <div className="img_upload">
                <form>
                    {images === null ? (
                        <input type="file" accept="image/*" className="file-input" multiple onChange={(ev) => setimages(ev.target.files)} />
                    ) : null}
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
