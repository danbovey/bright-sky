import styled from 'styled-components';

export const HourlyForecastArea = styled.div`
  margin-top: 2rem;
`;

export const HourlyForecastHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5em;
  padding: 0 16px;

  h6 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: inherit;
  }

  a {
    color: #24609c;
  }
`;

export const HourlyForecastRow = styled.div`
  overflow: auto;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  img {
    max-width: 100%;
    height: 56px;
    padding: 8px;
  }
`;

export const ForecastItem = styled.div`
  display: inline-block;
  width: 72px;
  text-align: center;
`;

export const ForecastTime = styled.p`
  margin: 0;
  font-size: 0.9rem;
  text-transform: uppercase;
  color: #797884;
`;

export const ForecastTemp = styled.p`
  margin: 0;
  font-weight: 600;
`;
