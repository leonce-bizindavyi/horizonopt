"use client"
import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as yup from 'yup';



const Create = () => {
  const [content, setContent] = useState("")
  const initialValues = {
    title: '',
    description: '',
    image: '',
    action: 'pub',
    tags: ''
  }
  const initialData = '<h1>Hello this is the blog title!</h1>'
  const editorConfiguration = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableCellProperties',
      'tableStyle',
      'mediaEmbed',
      'undo',
      'redo',
      'strikethrough',
    ],
  };
  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    image: yup.string().required('Image URL is required'),
    action: yup.string().oneOf(['pub', 'draf'], 'Invalid action'),
    tags: yup.string()
      .required('Tags are required')
      .test('isValidTagFormat', 'Invalid tag format', (value) => {
        if (!value) {
          return true; // Allow empty string
        }
        const tags = value.split(',');

        // Option 1: Using a Regular Expression (more concise)
        // return tags.every((tag) => /^#([a-zA-Z0-9]+)$/.test(tag));

        // Option 2: Using a loop for more flexibility
        return tags.every((tag) => {
          if (!tag.slice(1).match(/^[a-zA-Z0-9]+$/)) {
            return false;
          }
          return true;
        });
      }),
  });

  const [isSubmitting, setSubmitting] = useState(false)
  const createBlog = async (data) => {
    const additionalDatas = {
      "content": content,
      "author": 'Legend',
    };
    setSubmitting(true)
    const blogData = {
      ...data,
      ...additionalDatas
    };
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blogData }),
    }
    )
    const responseData = await res.json();
    setSubmitting(false)
    console.log('API response data:', responseData)

  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-neutral-700 dark:bg-opacity-50 bg-opacity-20 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <Formik
              initialValues={initialValues}
              onSubmit={createBlog}
              validationSchema={validationSchema}
            >
              <Form >
                <div className="mb-4">
                  <label className="text-xl text-gray-600">Title <span className="text-red-500">*</span></label><br />
                  <Field
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="title"
                    id="title"
                    placeholder="Enter title"

                  />
                  <ErrorMessage name="title" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
                  <label className="text-xl text-gray-600">Description</label><br />
                  <Field
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="description"
                    id="description"
                    placeholder="Optional description"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500" />
                </div>
                <div className="mb-4">
                  <label className="text-xl text-gray-600">Image de couverture</label><br />
                  <Field
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="image"
                    id="image"
                    placeholder="Image link"
                  />
                  <ErrorMessage name="image" component="div" className="text-red-500" />
                </div>

                <div className="mb-8">
                  <label className="text-xl text-gray-600">Content <span className="text-red-500">*</span></label><br />
                  <CKEditor
                    editor={ClassicEditor}
                    config={editorConfiguration}
                    data={initialData}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data)
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-xl text-gray-600">Mots Clés</label><br />
                  <Field
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="tags"
                    id="tags"
                    placeholder="tag1,tag2,tag3,tag4"
                  />
                  <ErrorMessage name="tags" component="div" className="text-red-500" />
                </div>
                <div className="flex p-1">
                  <select
                    className="border-2 border-gray-300 border-r p-2"
                    name="action"
                    id="action"
                  >
                    <option value="pub">Save and Publish</option>
                    <option value="draf">Save Draft</option>
                  </select>
                  <ErrorMessage name="action" component="div" className="text-red-500" />
                  <button
                    type="submit"
                    className="p-3 bg-blue-500 text-white hover:bg-blue-400"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Create;