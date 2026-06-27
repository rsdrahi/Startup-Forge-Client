'use client'
import { Button, Chip, Table } from '@heroui/react';
import React from 'react';

const FounderApplicationsTable = ({ applications }) => {
  console.log(applications, "Application");
  return (
    <div>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Founder Applications">

            <Table.Header>
              <Table.Column isRowHeader>
                Opportunity ID
              </Table.Column>

              <Table.Column>
                Email
              </Table.Column>

              <Table.Column>
                Portfolio
              </Table.Column>

              <Table.Column>
                Message
              </Table.Column>

              <Table.Column>
                Status
              </Table.Column>

              <Table.Column>
                Action
              </Table.Column>
            </Table.Header>

            <Table.Body
              items={applications}
              renderEmptyState={() => (
                <p>No Applications</p>
              )}
            >
              {(app) => (
                <Table.Row id={app._id}>
                  <Table.Cell>{app.opportunityId}</Table.Cell>

                  <Table.Cell>{app.email}</Table.Cell>

                  <Table.Cell>{app.url}</Table.Cell>

                  <Table.Cell>{app.message}</Table.Cell>

                  <Table.Cell>{app.status}</Table.Cell>

                  <Table.Cell>
                    Action
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>

          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default FounderApplicationsTable;