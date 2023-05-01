import { useLoading, Puff } from "@agney/react-loading";

const Loading = () => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Puff width="50" />,
  });

  //   return <MyLoader />;
  return (
    /* Accessibility props injected to container */
    <section
      className="w-full h-full flex justify-center items-center"
      {...containerProps}
    >
      {indicatorEl} {/* renders only while loading */}
    </section>
  );
};
export default Loading;
