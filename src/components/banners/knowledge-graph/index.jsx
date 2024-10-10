import styled from "styled-components";

export const KnowledgeGraph = () => {
  return (
    <Wrapper>
      <div className="img"></div>
      <div className="content">
        <div className="title">Knowledge Graphs</div>
        <div className="subtitle">Workflows create the graph. Unleash the power of graphRAG.</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 439px;
  height: 209px;
  display: flex;
  .img {
    width: 209px;
    border-radius: 6px 6px 0px 0px;
    background: rgba(0, 0, 0, 0.1);
    box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.1);
  }

  .content {
    flex: 1;
    padding: 43px 18px 24px 24px;

    .title {
      color: #fff;
      leading-trim: both;
      text-edge: cap;
      text-shadow: 0px 4px 40px #000;
      font-family: Supply;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 140%; /* 22.4px */
      text-transform: uppercase;
    }

    .subtitle {
      margin-top: 31px;
      color: #fff;
      leading-trim: both;
      text-edge: cap;
      font-family: Barlow;
      font-size: 13px;
      font-style: normal;
      font-weight: 300;
      line-height: 140%;
      white-space: normal;
    }
  }
`;
