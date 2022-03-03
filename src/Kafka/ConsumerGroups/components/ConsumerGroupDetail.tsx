import {
  Flex,
  FlexItem,
  Stack,
  TextContent,
  TextVariants,
  Text,
} from "@patternfly/react-core";
import {
  cellWidth,
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  wrappable,
} from "@patternfly/react-table";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { ConsumerGroupPopover } from "./ConsumerGroupPopover";
import { ConsumerGroup } from "../types";

export type ConsumerGroupDetailProps = {
  consumerGroupByTopic: boolean;
  consumerGroupDetail: ConsumerGroup;
};

export const ConsumerGroupDetail: FunctionComponent<
  ConsumerGroupDetailProps
> = ({ consumerGroupByTopic, consumerGroupDetail }) => {
  const { t } = useTranslation(["kafka"]);

  const columns = consumerGroupByTopic
    ? [
        {
          title: t("consumerGroup.partition"),
          transforms: [wrappable, cellWidth(20)],
        },
        {
          title: t("consumerGroup.consumer_id"),
          transforms: [wrappable, cellWidth(20)],
        },
        {
          title: t("consumerGroup.current_offset"),
          transforms: [wrappable, cellWidth(20)],
        },
        {
          title: t("consumerGroup.log_end_offset"),
          transforms: [wrappable, cellWidth(20)],
        },
        {
          title: t("consumerGroup.offset_lag"),
          transforms: [wrappable, cellWidth(20)],
        },
        {
          title: "",
          dataLabel: t("common.action"),
        },
      ]
    : [
        { title: t("topic.topic"), transforms: [wrappable, cellWidth(20)] },
        {
          title: t("consumerGroup.partition"),
          transforms: [wrappable, cellWidth(20)],
        },
        {
          title: t("consumerGroup.consumer_id"),
          transforms: [wrappable, cellWidth(20)],
        },
        {
          title: t("consumerGroup.current_offset"),
          transforms: [wrappable, cellWidth(20)],
        },
        {
          title: t("consumerGroup.log_end_offset"),
          transforms: [wrappable, cellWidth(20)],
        },
        {
          title: t("consumerGroup.offset_lag"),
          transforms: [wrappable, cellWidth(20)],
        },
        {
          title: "",
          dataLabel: t("common.action"),
        },
      ];

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
            <Text component={TextVariants.p}>
              <Text component={TextVariants.h2}>
                {consumerGroupDetail &&
                  consumerGroupDetail.consumers.reduce(function (prev, cur) {
                    return prev + (cur.partition != -1 ? 1 : 0);
                  }, 0)}
              </Text>
            </Text>
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
            <Text component={TextVariants.p}>
              <Text component={TextVariants.h2}>
                {consumerGroupDetail &&
                  consumerGroupDetail.consumers.reduce(function (prev, cur) {
                    return prev + (cur.lag > 0 ? 1 : 0);
                  }, 0)}
              </Text>
            </Text>
          </FlexItem>
          <FlexItem>
            <Text component={TextVariants.h4}>{t("consumerGroup.state")}</Text>
            <Text component={TextVariants.p}>
              <Text component={TextVariants.h2}>
                {consumerGroupDetail?.state}
              </Text>
            </Text>
          </FlexItem>
        </Flex>
      </TextContent>
      <TableComposable
        aria-label={t("consumerGroup.consumer_group_info_table_aria")}
      >
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th>{column.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {(consumerGroupDetail &&
            consumerGroupDetail.consumers.map((consumergroup) => {
              return (
                <Tr>
                  {consumerGroupByTopic
                    ? [
                        <Td>{consumergroup.partition}</Td>,
                        consumergroup.memberId ? (
                          <Td>
                            {consumergroup.groupId +
                              "\n" +
                              consumergroup.memberId}
                          </Td>
                        ) : (
                          <Td>
                            <i>{t("consumerGroup.unassigned")}</i>
                          </Td>
                        ),
                        <Td>{consumergroup.offset}</Td>,
                        <Td>{consumergroup.logEndOffset}</Td>,
                        <Td>{consumergroup.lag}</Td>,
                      ]
                    : [
                        <Td>{consumergroup.topic}</Td>,
                        <Td>{consumergroup.partition}</Td>,
                        consumergroup.memberId ? (
                          <Td>
                            {consumergroup.groupId +
                              "\n" +
                              consumergroup.memberId}
                          </Td>
                        ) : (
                          <Td>
                            <i>{t("consumerGroup.unassigned")}</i>
                          </Td>
                        ),
                        <Td>{consumergroup.offset}</Td>,
                        <Td>{consumergroup.logEndOffset}</Td>,
                        <Td>{consumergroup.lag}</Td>,
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
