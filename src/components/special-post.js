import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Tags from "./tags";

const SpecialPostList = ({ posts }) => {
    const SpecialPostList = posts.map(({ frontmatter, fields, excerpt, timeToRead }) => {
    const { title, tags, date, description, specialPost } = frontmatter;
    const { slug } = fields;

    return (
      <SpecialPostListItem
        key={slug}
        tags={tags}
        title={title}
        date={date}
        slug={slug}
        timeToRead={timeToRead}
        description={description}
        excerpt={excerpt}
        specialPost={specialPost}
      />
    );
  });

  return <StyledSpecialPostList>{SpecialPostList}</StyledSpecialPostList>;
};

export default SpecialPostList;

const SpecialPostListItem = ({
  title,
  date,
  timeToRead,
  tags,
  excerpt,
  description,
  specialPost,
  slug,
}) => {
    let then = new Date({date});
    let now = new Date();
    now.setFullYear(now.getFullYear()-1);
    
    if (specialPost !== true || now.getFullYear() !== then.getFullYear() || now.getMonth() !== then.getMonth() || now.getDay() !== then.getDay()) {
        return;
    }
  return (
    <StyledSpecialPostListItem>
      <Tags tags={tags} />

      <PostListTitle>
        <Link to={slug}>{title}</Link>
      </PostListTitle>
      <PostListExcerpt
        dangerouslySetInnerHTML={{
          __html: description || excerpt,
        }}
      />
      <PostListMeta>
        <span>{date}</span>

        <span>{timeToRead} mins</span>
      </PostListMeta>
    </StyledSpecialPostListItem>
  );
};



const StyledSpecialPostList = styled.ul`
  padding: 0;
  list-style: none;
  display: grid;
  justify-items: center;
  grid-gap: var(--size-600);
  grid-template-columns: repeat(auto-fit, minmax(35ch, 1fr));

  @media screen and (max-width: 500px) {
    & {
      display: block;
    }
  }
`;

const StyledSpecialPostListItem = styled.li`
  display: flex;
  padding: 1.5rem;
  border-radius: 8px;
  position: relative;
  flex-direction: column;
  transition: all 0.3s ease-out;

  body.light-mode & {
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0.3);
  }

  body.light-mode &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  body.dark-mode & {
    background-color: #3b3b3c;
    border: 1px solid #515151;
  }

  @media screen and (max-width: 500px) {
    & {
      margin-top: var(--size-600);
    }
  }
`;

const PostListTitle = styled.h2`
  line-height: 1.2;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
  font-size: var(--size-600);
  font-weight: 700;

  & a {
    text-decoration: none;
    color: inherit;
  }

  & a::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const PostListExcerpt = styled.p`
  margin-top: auto;
  font-size: var(--size-400);
`;

const PostListMeta = styled.div`
  margin-top: 2rem;

  font-size: var(--size-300);
  display: flex;
  justify-content: space-between;
`;
