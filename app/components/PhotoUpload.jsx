import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class PhotoUpload extends React.Component {
  constructor(props) {
    super(props);
  }

  onDrop(file) {
    const reader = new FileReader();
    // Reader.onload is asynchronous
    // ReadAsDataURL runs first and calls .onload when it's done
    reader.onload = (encodedImage) => {
      axios({
        method: 'post',
        url: 'https://api.imgur.com/3/image',
        headers: {
          Authorization: 'Client-ID b2670fcbac651a9',
        },
        data: {
          image: encodedImage.target.result.split('data:image/png;base64,')[1],
          type: 'base64',
        },
      })
      .then((response) => {
        // This is the link to the photo
        console.log('IMGUR URL: ', response.data.data.link);
      })
      .catch((err) => {
        console.error(err);
      });
    };

    reader.readAsDataURL(file[0]);
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    );
  }
}
