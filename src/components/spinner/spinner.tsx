import styled from 'styled-components';

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: #ee7d20;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 0.6s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
