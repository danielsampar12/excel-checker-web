import React, {useEffect, useState} from 'react';

import { FaFileExcel } from 'react-icons/fa';
import { MdCheckCircle, MdError, MdLink} from 'react-icons/md';

import filesize from 'filesize';

import { Container, FileInfo} from './styles';

import api from '../../services/api';

function Archives(){
    const [files, setFiles] = useState([]);

    useEffect(() => {
        async function loadFiles(){
            const response = await api.get('/posts');
            setFiles(response.data);
        }
        loadFiles();
    },[])
    
    async function handleDelete(id){
        await api.delete(`/posts/${id}`)
            .then(setFiles(files.filter(file => file._id !== id)))
            .catch(error => console.log(error))
    }

    return (
        <Container>
        {files.map((uploadFile, index) => (
            <li key={index}>
                <FileInfo>
                    <FaFileExcel size={24} style={{marginRight: 8}} color="#222" />
                    <div>
                        <strong>{uploadFile.name}</strong>
                        <span>
                            {filesize(uploadFile.size)}{" "}
                            <button onClick={() => {}}>Excluir</button>
                        </span>
                    </div>
                </FileInfo>
                <div>
                    
                    {uploadFile.url && (
                        <a
                            href={uploadFile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                        </a>
                    )}
                    <MdCheckCircle size={24} color="#78e5a2" />
                    
                </div>
            </li>
        ))}
    </Container>
    );
};

export default Archives;
