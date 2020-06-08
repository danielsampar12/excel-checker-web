import React from 'react';
import {CircularProgressbar} from 'react-circular-progressbar';

import { FaFileExcel } from 'react-icons/fa'
import { MdCheckCircle, MdError, MdLink} from 'react-icons/md'

import { Container, FileInfo, Preview } from './styles';

const FileList = ({ files, onDelete }) => (
    <Container>
        {files.map((uploadFile, index) => (
            <li key={index}>
                <FileInfo>
                    <FaFileExcel size={24} style={{marginRight: 8}} color="#222" />
                    <div>
                        <strong>{uploadFile.name}</strong>
                        <span>
                            {uploadFile.readableSize}{" "}
                            { !!uploadFile.url && (<button onClick={() => onDelete(uploadFile.id)}>Excluir</button>)}
                        </span>
                    </div>
                </FileInfo>
                <div>
                    {!uploadFile.uploaded && !uploadFile.error && (
                        <CircularProgressbar
                            styles={{
                                root: { width: 24},
                                path: { stroke: '#78e5a2'}
                            }}
                            strokeWidth={10}
                            value={uploadFile.progress}
                        />
                    )}
                    {uploadFile.url && (
                        <a
                            href={uploadFile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                        </a>
                    )}
                    {uploadFile.uploaded && <MdCheckCircle size={24} color="#78e5a2" />}
                    {uploadFile.error && <MdError size={24} color="#e57878" />}
                </div>
            </li>
        ))}
    </Container>
);

export default FileList;
