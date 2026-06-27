'use client'
import { updateApplicationsStatus } from '@/lib/api/applyOpportunities/actions';
import { Button, Chip, Table } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const FounderApplicationsTable = ({ applications }) => {
  // console.log(applications, "Application");

  const router = useRouter();
  const handleAccept = async (id) => {
    const res = await updateApplicationsStatus(id, "accepted");
    if (res.modifiedCount > 0) {
      toast.success("Application Accept")
      router.refresh();
    }
  };

  const handleReject = async (id) => {
    const res = await updateApplicationsStatus(id, "rejected");
    if (res.modifiedCount > 0) {
      toast.success("Application Rejected")
      router.refresh();
    }
  };

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
                    <Chip
                      color={
                        app.status === "accepted"
                          ? "success"
                          : app.status === "rejected"
                            ? "danger"
                            : "warning"
                      }
                      variant="flat"
                    >
                      {app.status}
                    </Chip>
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