import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '')
        .replace(/\s+/g, '-');
    }
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        const newSlug = slugTransform(value.title || '');
        setValue('slug', newSlug, { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      let featuredImageId = post?.feauturedImage || '';

      if (data.image && data.image[0]) {
        const uploadedFile = await appwriteService.uploadFile(data.image[0]);
        if (uploadedFile) {
          featuredImageId = uploadedFile.$id;

          if (post?.feauturedImage) {
            await appwriteService.deleteFile(post.feauturedImage);
          }
        } else {
          console.error('File upload failed. Cannot proceed.');
          return;
        }
      }

      if (!featuredImageId) {
        console.error('No featured image provided and it\'s required.');
        return;
      }

      const postPayload = {
        ...data,
        feauturedImage: featuredImageId,
        userId: post?.userId || userData?.$id,
      };

      let response;
      if (post) {
        response = await appwriteService.updatePost(post.$id, postPayload);
      } else {
        response = await appwriteService.createPost(postPayload);
      }

      if (response) {
        navigate(`/post/${response.$id}`);
      }
    } catch (error) {
      console.error('PostForm :: submit :: error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title:"
          placeholder="Title"
          className="mb-4"
          {...register('title', { required: true })}
        />
        <Input
          label="Slug:"
          placeholder="Slug"
          className="mb-4"
          {...register('slug', { required: true })}
          onInput={(e) =>
            setValue(
              'slug',
              slugTransform(e.currentTarget.value),
              { shouldValidate: true }
            )
          }
        />
        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues('content')}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image:"
          type="file"
          className="mb-4"
          accept="image/*"
          {...register('image', { required: !post })}
        />
        {post?.feauturedImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.feauturedImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label="Status"
          className="mb-4"
          {...register('status', { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? 'bg-green-500' : undefined}
          className="w-full"
        >
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
