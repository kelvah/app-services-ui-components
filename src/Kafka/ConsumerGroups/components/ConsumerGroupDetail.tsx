import {
  Flex,
  FlexItem,
  Stack,
  TextContent,
  TextVariants,
  Text,
} from "@patternfly/react-core";
import {
  TableComposable,
  TableVariant,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { ConsumerGroupPopover } from "./ConsumerGroupPopover";
import { ConsumerGroup } from "../types";
import { displayConsumerGroupState } from "../utils";

export type ConsumerGroupDetailProps = {
  consumerGroupByTopic: boolean;
  consumerGroupDetail: ConsumerGroup;
};

export const ConsumerGroupDetail: FunctionComponent<
  ConsumerGroupDetailProps
> = ({ consumerGroupByTopic, consumerGroupDetail }) => {
  const { t } = useTranslation(["kafka"]);

  const columnNames = {
    topic: t("topic.topic"),
    partition: t("consumerGroup.partition"),
    consumer_id: t("consumerGroup.consumer_id"),
    current_offset: t("consumerGroup.current_offset"),
    log_end_offset: t("consumerGroup.log_end_offset"),
    offset_lag: t("consumerGroup.offset_lag"),
  };

  return (
    <Stack hasGutter>
      <TextContent>
        <Flex>
          <FlexItem>
            <Text component={TextVariants.h4} size={50}>
              {consumerGroupByTopic
                ? t("consumerGroup.active_members_for_topic")
                : t("consumerGroup.active_members")}{" "}
            </Text>
            <div>
              <Text component={TextVariants.h2}>
                {consumerGroupDetail &&
                  consumerGroupDetail.consumers.reduce(function (prev, cur) {
                    return prev + (cur.partition != -1 ? 1 : 0);
                  }, 0)}
              </Text>
            </div>
          </FlexItem>
          <FlexItem>
            <Text component={TextVariants.h4}>
              {consumerGroupByTopic
                ? t("consumerGroup.partitions_with_lag_for_topic")
                : t("consumerGroup.partitions_with_lag")}{" "}
              <ConsumerGroupPopover
                title={t("consumerGroup.partitions_with_lag_name")}
                description={t("consumerGroup.partitions_with_lag_description")}
              />
            </Text>
            <div>
              <Text component={TextVariants.h2}>
                {consumerGroupDetail &&
                  consumerGroupDetail.consumers.reduce(function (prev, cur) {
                    return prev + (cur.lag > 0 ? 1 : 0);
                  }, 0)}
              </Text>
            </div>
          </FlexItem>
          <FlexItem>
            <Text component={TextVariants.h4}>{t("consumerGroup.state")}</Text>
            <div>
              <Text component={TextVariants.h2}>
                {displayConsumerGroupState[consumerGroupDetail.state]}
              </Text>
            </div>
          </FlexItem>
        </Flex>
      </TextContent>
      <TableComposable
        aria-label={t("consumerGroup.consumer_group_info_table_aria")}
        variant={TableVariant.compact}
      >
        <Thead noWrap>
          <Tr>
            {consumerGroupByTopic
              ? [
                  <Th key={columnNames.partition} width={20}>
                    {columnNames.partition}
                  </Th>,
                  <Th key={columnNames.consumer_id} width={20}>
                    {columnNames.consumer_id}
                  </Th>,
                  <Th key={columnNames.current_offset} width={20}>
                    {columnNames.current_offset}
                  </Th>,
                  <Th key={columnNames.log_end_offset} width={20}>
                    {columnNames.log_end_offset}
                  </Th>,
                  <Th key={columnNames.offset_lag} width={20}>
                    {columnNames.offset_lag}
                  </Th>,
                ]
              : [
                  <Th key={columnNames.topic} width={20}>
                    {columnNames.topic}
                  </Th>,
                  <Th key={columnNames.partition} width={20}>
                    {columnNames.partition}
                  </Th>,
                  <Th key={columnNames.consumer_id} width={20}>
                    {columnNames.consumer_id}
                  </Th>,
                  <Th key={columnNames.current_offset} width={20}>
                    {columnNames.current_offset}
                  </Th>,
                  <Th key={columnNames.log_end_offset} width={20}>
                    {columnNames.log_end_offset}
                  </Th>,
                  <Th key={columnNames.offset_lag} width={20}>
                    {columnNames.offset_lag}
                  </Th>,
                ]}
          </Tr>
        </Thead>
        <Tbody>
          {(consumerGroupDetail &&
            consumerGroupDetail.consumers.map((consumergroup) => {
              return (
                <Tr key={consumergroup.groupId}>
                  {consumerGroupByTopic
                    ? [
                        <Td key={columnNames.partition}>
                          {consumergroup.partition}
                        </Td>,
                        <Td key={columnNames.consumer_id}>
                          {consumergroup.memberId ? (
                            consumergroup.groupId +
                            "\n" +
                            consumergroup.memberId
                          ) : (
                            <i>{t("consumerGroup.unassigned")}</i>
                          )}{" "}
                        </Td>,
                        <Td key={columnNames.current_offset}>
                          {consumergroup.offset}
                        </Td>,
                        <Td key={columnNames.log_end_offset}>
                          {consumergroup.logEndOffset}
                        </Td>,
                        <Td key={columnNames.offset_lag}>
                          {consumergroup.lag}
                        </Td>,
                      ]
                    : [
                        <Td key={columnNames.topic}>{consumergroup.topic}</Td>,
                        <Td key={columnNames.partition}>
                          {consumergroup.partition}
                        </Td>,
                        <Td key={columnNames.consumer_id}>
                          {consumergroup.memberId ? (
                            consumergroup.groupId +
                            "\n" +
                            consumergroup.memberId
                          ) : (
                            <i>{t("consumerGroup.unassigned")}</i>
                          )}{" "}
                        </Td>,
                        <Td key={columnNames.current_offset}>
                          {consumergroup.offset}
                        </Td>,
                        <Td key={columnNames.log_end_offset}>
                          {consumergroup.logEndOffset}
                        </Td>,
                        <Td key={columnNames.offset_lag}>
                          {consumergroup.lag}
                        </Td>,
                      ]}
                </Tr>
              );
            })) ||
            []}
        </Tbody>
      </TableComposable>
    </Stack>
  );
};
