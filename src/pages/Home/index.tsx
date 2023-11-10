import { h, VNode } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Column from "../../components/Column";
import TaskList from "../../components/TaskList";
import TaskForm from "../../components/TaskForm";
import TaskItemDto from "../../objects/taskItem/TaskItemDto";
import { signal } from "@preact/signals";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export function Home(): VNode {
  return (
    <Container>
      <Row className="mt-5 border-bottom">
        <h1>ToDo App </h1>
      </Row>
      <Row className="mt-4">
        <Column className="col-8">
          <TaskList />
        </Column>
        <Column className="col-4">
          <TaskForm />
        </Column>
      </Row>
    </Container>
  );
}
