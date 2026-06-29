'use client'
import { updateApplicationsStatus } from '@/lib/api/applyOpportunities/actions';
import { Button, Chip, Table } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const FounderApplicationsTable = ({ applications, refreshApplications }) => {
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
              <Table.Column isRowHeader>Opportunity ID</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Portfolio</Table.Column>
              <Table.Column>Message</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Action</Table.Column>
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

                  <Table.Cell>
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Portfolio
                    </a>
                  </Table.Cell>

                  <Table.Cell>{app.message}</Table.Cell>

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

                  <Table.Cell>
                    {app.status === "pending" ? (
                      <div className="flex gap-2">
                        <Button
                          color="success"
                          size="sm"
                          onPress={() => handleAccept(app._id)}
                        >
                          Accept
                        </Button>

                        <Button
                          color="danger"
                          size="sm"
                          onPress={() => handleReject(app._id)}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">
                        No Action
                      </span>
                    )}
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