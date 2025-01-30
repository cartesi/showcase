import Link from '@docusaurus/Link';
import React from 'react';
import { PageFrontMatter } from '../theme/MDXContent';
import Tag from './Tag';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Props = {
  page: PageFrontMatter;
};

const tagsLimit = 5;

const ShowcaseItem = ({ page }: Props) => {
  const { title, description, lastUpdated, tags, path, thumbnail } = page;
  const { siteConfig } = useDocusaurusContext();

  const languages_libraries_stacks = Array();
  if (tags.languages) languages_libraries_stacks.push(...tags.languages);
  if (tags.stacks_and_libraries)
    languages_libraries_stacks.push(...tags.stacks_and_libraries);

  return (
    <div className='flex flex-col gap-6 lg:gap-8 relative p-6 pb-4 bg-card text-card-foreground rounded-3xl'>
      <Link className='absolute inset-0 z-10' to={path} />
      <div className='flex gap-4 items-center'>
        <div className='overflow-hidden w-24 relative flex-shrink-0 rounded-2xl'>
          {thumbnail && (
            <img
              src={useBaseUrl(
                `${siteConfig.customFields.projectsImagesPath}${path}/${thumbnail}`
              )}
              alt={title}
              className='w-full object-cover block transition-transform aspect-square rounded-2xl'
              loading='lazy'
            />
          )}
        </div>
        <div>
          {/* {JSON.stringify(tags)} */}
          {tags.projectStage && (
            <Tag type='projectStage' tag={tags.projectStage} />
          )}
        </div>
      </div>
      <div className='flex flex-col grow'>
        <div className='flex gap-2 items-center mb-1'>
          <h3 className='text-lg m-0 sm:text-xl font-bold'>{title}</h3>
          <Tag
            type='projectTypes'
            tag={tags.projectTypes}
            contentClass='bg-transparent'
          />
        </div>
        <p className='text-sm mb-2 text-muted-foreground'>{description}</p>
        <div className='flex flex-wrap gap-1 mt-auto pt-2 relative z-20'>
          {languages_libraries_stacks &&
            languages_libraries_stacks.slice(0, tagsLimit).map((tag, i) => {
              return <Tag type='languages' tag={tag} key={i} isLink />;
            })}
          {languages_libraries_stacks &&
            languages_libraries_stacks.length > tagsLimit && (
              <Tag
                type='languages'
                tag={
                  '+' +
                  (languages_libraries_stacks.length - tagsLimit) +
                  ' more'
                }
              />
            )}
        </div>
        {lastUpdated && lastUpdated != '' && (
          <div className='pt-4 text-xs text-muted-foreground italic'>
            Last updated: {lastUpdated}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowcaseItem;
