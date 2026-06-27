'use client'

import React, { useEffect, useState } from 'react';
import { Table } from "@heroui/react";

import { useSession } from '@/lib/auth-client';
import { getMyApplications } from '@/lib/api/applyOpportunities/data';

const MyApplicationsPage = () => {

  const { data: session } = useSession();

  const [applications, setApplications] = useState([]);

  useEffect(() => {

    const loadData = async () => {

      if (!session?.user?.id) return;

      const data = await getMyApplications(session.user.id);

      setApplications(data);

    };

    loadData();

  }, [session]);

  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        My Applications
      </h2>

      <Table>

        <Table.ScrollContainer>

          <Table.Content aria-label="Applications Table">

            <Table.Header>
              <Table.Column isRowHeader>Opportunity ID</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Portfolio</Table.Column>
              <Table.Column>Message</Table.Column>
              <Table.Column>Status</Table.Column>
            </Table.Header>

            <Table.Body
              items={applications}
              renderEmptyState={() => (
                <p className="text-center py-4">
                  No Applications Found
                </p>
              )}
            >

              {(app) => (

                <Table.Row id={app._id}>
                  <Table.Cell>
                    {app.opportunityId}
                  </Table.Cell>
                  <Table.Cell>
                    {app.email}
                  </Table.Cell>
                  <Table.Cell>
                    {app.url}
                  </Table.Cell>
                  <Table.Cell>
                    {app.message}
                  </Table.Cell>
                  <Table.Cell>
                    {app.status}
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

export default MyApplicationsPage;