import styled from 'styled-components';

export const Panel = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background: #eee;
`;

export const LocationArea = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;

export const Temp = styled.div`
  position: relative;
  margin-top: 2rem;
  font-size: 7rem;
  text-align: center;
`;

export const Degree = styled.span`
  position: absolute;
  display: inline-block;
  transform: translate(-6px, 8px);
  font-family: Arial, sans-serif;
  font-size: 50%;
`;

export const Description = styled.div`
  margin: 0.3em 0 1.5em;
  font-size: 1.1rem;
  text-align: center;
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;

  > div {
    text-align: center;
  }
`;

export const WindDirection = styled.div`
  display: inline-block;
  padding-left: 8px;
`;
