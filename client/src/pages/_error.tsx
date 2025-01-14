import Head from "@/components/next/Head";
import { Result, Button } from "antd";
import Header from "@/components/common/Header";
import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";

const Error: NextPage = (props: any): JSX.Element => {
  let statusCode: number = props.statusCode;
  let router = useRouter();

  return (
    <>
      <Head
        title={`${statusCode} | 页面加载错误`}
        description={statusCode + ""}
        keyword={[statusCode + ""]}
      />
      <Header />
      <Result
        status={statusCode as any} //antd支持的类型比较特殊直接any
        title={statusCode}
        subTitle="页面加载错误"
        extra={
          <Button type="primary" onClick={() => router.replace("/")}>
            回到首页
          </Button>
        }
      />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ctx => {
  
  return {
    props: {
      statusCode: ctx.res.statusCode,
    },
  };
};
export default Error;
