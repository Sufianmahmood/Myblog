// RTE.jsx
import React, { useRef } from 'react';
import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import appwriteService from '../appwrite/config';

function RTE({ name, control, label, defaultValue = '' }) {
  const editorRef = useRef(null);

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <Editor
           apiKey="3q1tnojhuja6waqxjjkiv4528arf2mh0l4p946fc9btr8xrj"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={defaultValue}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image',
                'charmap', 'preview', 'anchor', 'searchreplace',
                'visualblocks', 'code', 'fullscreen', 'insertdatetime',
                'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar:
                'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | removeformat | help | image',

              images_upload_handler: async (blobInfo, success, failure) => {
                try {
                  const file = new File([blobInfo.blob()], blobInfo.filename());
                  const uploadedFile = await appwriteService.uploadFile(file);
                  if (uploadedFile && uploadedFile.$id) {
                    const imageUrl = appwriteService.getFileView(uploadedFile.$id); // Use getFileView
                    success(imageUrl.toString());
                  } else {
                    failure('Image upload failed');
                  }
                } catch (err) {
                  console.error('TinyMCE image upload error:', err);
                  failure('Image upload error');
                }
              }
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
