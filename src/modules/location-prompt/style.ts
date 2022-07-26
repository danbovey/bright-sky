import styled from 'styled-components';

export const PromptOverlay = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(196, 226, 255, 0.7);
`;

export const Prompt = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2.5rem 2.5rem 4rem;
  background: #fff;
  border-radius: 32px 32px 0 0;
`;

export const PromptIntro = styled.div`
  margin-bottom: 2em;
  text-align: center;

  svg {
    width: 48px;
  }
`;

export const SearchArea = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 6px;
    left: 16px;
    width: 24px;
    height: 24px;
  }
`;

export const SearchInput = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 8px;
  padding: 8px 8px 8px 48px;
  appearance: none;
  border: 1px solid #eee;
  border-radius: 8px;
  background: none;
  font: inherit;
`;

export const SearchError = styled.div`
  margin: 1em 0;
  text-align: center;
`;

export const SearchResultsList = styled.div`
  overflow: auto;
  max-height: 300px;
  margin: 0.5em 0;
`;

export const SearchResult = styled.button`
  width: 100%;
  appearance: none;
  border: none;
  padding: 0.5em;
  overflow: hidden;
  white-space: nowrap;
  background: none;
  font: inherit;
  text-align: left;
  text-overflow: ellipsis;
  text-decoration: underline;
  color: #00e;
`;

export const GeolocateButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  background: #efefef;
  width: 100%;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;
