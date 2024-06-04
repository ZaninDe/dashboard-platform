const AssesmentIdPage = async ({
  params,
}: {
  params: { assessmentId: string }
}) => {
  return <div>{params.assessmentId}</div>
}

export default AssesmentIdPage
