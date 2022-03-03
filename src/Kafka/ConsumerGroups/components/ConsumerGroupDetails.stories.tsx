import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConsumerGroupDetail } from "./ConsumerGroupDetail";
import { ConsumerGroup, ConsumerGroupStateEnum } from "../types";

const withActiveMembers: ConsumerGroup = {
  consumers: [
    {
      groupId: "1",
      topic: "test-topic",
      partition: 0,
      offset: 4,
      logEndOffset: 1,
      lag: 0,
      memberId: "123456789",
    },
    {
      groupId: "2",
      topic: "test-topic",
      partition: 1,
      offset: 3,
      logEndOffset: 1,
      lag: 0,
    },
  ],
  groupId: "2",
  state: ConsumerGroupStateEnum.Stable,
};

const withoutActiveMembers: ConsumerGroup = {
  consumers: [],
  groupId: "1",
  state: ConsumerGroupStateEnum.Stable,
};

export default {
  component: ConsumerGroupDetail,
  args: {},
} as ComponentMeta<typeof ConsumerGroupDetail>;

const Template: ComponentStory<typeof ConsumerGroupDetail> = (args) => (
  <ConsumerGroupDetail {...args} />
);

export const ConsumerGroupWithNoActiveMembers = Template.bind({});
ConsumerGroupWithNoActiveMembers.args = {
  consumerGroupDetail: withoutActiveMembers,
};

export const ConsumerGroupWithActiveMembers = Template.bind({});
ConsumerGroupWithActiveMembers.args = {
  consumerGroupDetail: withActiveMembers,
};

export const ConsumerGroupDetailsAtTopicLevel = Template.bind({});
ConsumerGroupDetailsAtTopicLevel.args = {
  consumerGroupDetail: withActiveMembers,
  consumerGroupByTopic: true,
};

export const ConsumerGroupDetailsAtKafkaLevel = Template.bind({});
ConsumerGroupDetailsAtKafkaLevel.args = {
  consumerGroupDetail: withActiveMembers,
  consumerGroupByTopic: false,
};
