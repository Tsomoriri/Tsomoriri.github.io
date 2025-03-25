import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import MarkdownHtml from '../components/MarkdownHtml';
import Skeleton from '../components/Skeleton';
import useHandling from '../hooks/use-handling';
import ArticleModel from '../models/ArticleModel';
import { unauthenticatedGithub as github } from '../services/github';

const Wrapper = tw.main`mx-auto w-full max-w-screen-lg px-8 py-12`;

const Title = tw.h2`text-2xl text-slate-700 mb-8`;

const Content = tw.div`bg-white dark:bg-gray-900 rounded-lg shadow-md p-8`;

const ParagraphSkeleton = tw.ul`mt-8 space-y-4`;

export type CVProps = {
  milestone: number;
};

export default function CV(props: CVProps) {
  const { milestone } = props;
  const navigate = useNavigate();
  const [cv, setCV] = useState<ArticleModel | null>(null);

  const [loading, loadCV] = useHandling(
    useCallback(async () => {
      try {
        // Fetch the first issue with the CV milestone
        const issues = await github.listIssues({
          milestone,
          pageSize: 1,
        });

        if (issues.length === 0) {
          navigate('/404');
          return;
        }

        setCV(ArticleModel.from(issues[0]));
      } catch (error) {
        console.error('Failed to load CV:', error);
        navigate('/404');
      }
    }, [milestone]),
    true
  );

  useEffect(() => {
    loadCV();
  }, [milestone]);

  return (
    <Wrapper>
      <Title>Curriculum Vitae</Title>
      
      <Content>
        {loading && (
          <ParagraphSkeleton>
            <Skeleton tw="w-1/2" />
            <Skeleton tw="w-full" />
            <Skeleton tw="w-4/5" />
            <Skeleton tw="w-full" />
            <Skeleton tw="w-3/5" />
            <Skeleton tw="w-full h-40" />
            <Skeleton tw="w-4/5" />
            <Skeleton tw="w-full" />
            <Skeleton tw="w-3/5" />
          </ParagraphSkeleton>
        )}

        {cv && <MarkdownHtml markdown={cv.body} playground />}
      </Content>
    </Wrapper>
  );
}