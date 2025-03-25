import React, { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'twin.macro';

import useHandling from '../hooks/use-handling';
import { unauthenticatedGithub as github } from '../services/github';

// Import the full Article component
import Article from './Article';

const Wrapper = tw.main`mx-auto w-full max-w-screen-lg`;

export type CVProps = {
  milestone: number;
};

export default function CV(props: CVProps) {
  const { milestone } = props;
  const navigate = useNavigate();
  
  const [loading, redirectToCV] = useHandling(
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

        // Redirect to the actual article using the issue number
        navigate(`/posts/${issues[0].number}`);
      } catch (error) {
        console.error('Failed to load CV:', error);
        navigate('/404');
      }
    }, [milestone, navigate]),
    true
  );

  useEffect(() => {
    redirectToCV();
  }, [redirectToCV]);

  return (
    <Wrapper>
      {/* Show loading state until redirect happens */}
      {loading && (
        <div tw="p-8 text-center">
          Loading CV...
        </div>
      )}
    </Wrapper>
  );
}