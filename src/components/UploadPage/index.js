import React, { Component, useEffect } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import GlobalStyle from '../../global';
import { Container , Content } from './styles';

import Upload from '../Upload';
import FileList from '../FileList';
import Archives from '../Archives';

import api from '../../services/api';

class UploadPage extends Component {
    state = {
        uploadFiles: [],
    };

    async componentDidMount() {
        const response = await api.get('posts');
        console.log(response.data)
        this.setState({
            uploadedFiles: response.data.map(file => ({
                id: file._id,
                name: file.name,
                readableSize: filesize(file.size),
                uploaded: true,
                url: file.url,
            }))
        }, () => {console.log(response.data, this.state.uploadFiles)});
    }

    handleUpload = files => {
        const uploadFiles = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
        }));

        this.setState({
            uploadFiles: this.state.uploadFiles.concat(uploadFiles)
        });

        uploadFiles.forEach(this.processUpload);
    };


    handleDelete = async id => {
        await api.delete(`/posts/${id}`);

        this.setState({
            uploadFiles: this.state.uploadFiles.filter(file => file.id !== id),
        });
    }

    updateFile = (id, data) => {
        this.setState({ uploadFiles: this.state.uploadFiles.map(uploadedFile => {
            return id === uploadedFile.id 
            ? { ...uploadedFile, ...data } 
            : uploadedFile;
        }) })
    };

    processUpload = (uploadedFile) => {
        const data = new FormData();

        data.append('file', uploadedFile.file, uploadedFile.name);

        api.post('/posts', data, {
            onUploadProgress: e => {
                const progress = parseInt(Math.round(e.loaded * 100 / e.total));
                this.updateFile(uploadedFile.id, {
                    progress,
                })
            }
        }).then(response => {
            this.updateFile(uploadedFile.id, {
                uploaded: true,
                id: response.data._id,
                url: response.data.url
            })
        }).catch(() => {
            this.updateFile(uploadedFile.id, {
                error: true
            })
        });
    };

    render() {
        const { uploadFiles } = this.state;
        return (
            <Container>
                <GlobalStyle />
                <Content>
                    <Upload onUpload={this.handleUpload} />
                    { !!uploadFiles.length && <FileList files={uploadFiles} onDelete={this.handleDelete}/>}
                </Content>
                <Content>
                    <Archives />
                </Content>
            </Container>
        );
    }
}

export default UploadPage;


