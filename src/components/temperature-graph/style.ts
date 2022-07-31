import styled from 'styled-components';

export const GraphArea = styled.div`
  position: relative;
  margin-top: 1rem;
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.2);

  h6 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: inherit;
  }
`;

export const GraphGradientOverlay = styled.div`
  position: absolute;
  display: block;
  left: 16px;
  right: 16px;
  top: 36px;
  height: 150px;
  background: rgba(255, 255, 255, 0.4);
  content: '';
`;

export const Labels = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
`;

export const Degree = styled.span`
  position: absolute;
  font-family: Arial, sans-serif;
`;
