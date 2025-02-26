import React, { useState } from "react";
import "./Post.css";
import { gql, useMutation } from "@apollo/client";

const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

const UNPUBLISH_POST = gql`
  mutation unpublishPost($postId: ID!) {
    postUnpublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

export default function Post({
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile,
}) {
  const [isPublished, setIsPublished] = useState(published);
  const [publishText, setPublishText] = useState(
    published ? "unpublish" : "publish"
  );

  const [publishPost, { data, loading }] = useMutation(PUBLISH_POST);
  const [unpublishPost, { data: unpublishData, loading: unpublishLoading }] =
    useMutation(UNPUBLISH_POST);
  const formatedDate = new Date(Number(date));
  return (
    <div
      className="Post"
      style={isPublished === false ? { backgroundColor: "hotpink" } : {}}
    >
      {isMyProfile && (
        <p
          className="Post__publish"
          onClick={() => {
            if (!published) {
              publishPost({
                variables: {
                  postId: id,
                },
              });
              setIsPublished(true);
              // setPublishText("unpublish");
            } else {
              unpublishPost({
                variables: {
                  postId: id,
                },
              });
              setIsPublished(false);
              // setPublishText("publish");
            }
          }}
        >
          {isPublished ? "unpublish" : "publish"}
        </p>
      )}
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created At {`${formatedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}
          {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
