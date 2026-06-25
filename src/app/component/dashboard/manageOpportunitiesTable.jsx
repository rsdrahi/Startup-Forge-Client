'use client'
import React, { useEffect, useState } from 'react';
import { Card, Table, TableContent, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import { useSession } from '@/lib/auth-client';
import { manageAllOpportunities } from '@/lib/api/opportunities/data';
import Link from 'next/link';
import ManageEditModal from './ManageEditModal';

const ManageOpportunitiesTable = () => {

  const { data: session } = useSession();
  const [manageOpportunities, setManageOpportunities] = useState([])

  const loadOpportunities = async () => {
    if (!session?.user?.id) return;
    const opportunitiesData = await manageAllOpportunities(session.user.id);
    setManageOpportunities(opportunitiesData);
  };

  useEffect(() => {
    loadOpportunities();
  }, [session]);

  return (
    <div className="mt-6">
      <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
        <div className="p-0 overflow-x-auto">
          <Table aria-label="Manage Opportunities Table">
            <TableContent>
              <TableHeader className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20" isRowHeader>ROLE TITLE</TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">WORK TYPE</TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">COMMITMENT</TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">DEADLINE</TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">APPLICATIONS</TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">ACTIONS</TableColumn>
              </TableHeader>

              <TableBody>
                {
                  manageOpportunities.map((opportunity) => (
                    <TableRow key={opportunity._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0">
                      <TableCell className="py-4 px-6 align-middle font-bold text-white">
                        <span className="line-clamp-1 truncate max-w-[150px] text-black">{opportunity.roleTitle}</span>
                      </TableCell>
                      <TableCell className="py-4 px-6 align-middle">
                        <Chip size="sm" className="font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                          {opportunity.workType}
                        </Chip>
                      </TableCell>
                      <TableCell className="py-4 px-6 align-middle">
                        <Chip size="sm" className="font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                          {opportunity.commitmentLevel}
                        </Chip>
                      </TableCell>
                      <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">{opportunity.deadline}</TableCell>
                      <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">12</TableCell>
                      <TableCell className="py-4 px-6 align-middle">
                        <div className="flex items-center gap-2">
                          <Link href={'/browseOpportunities'}>
                            <Button isIconOnly size="sm" variant="light" className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 rounded-md min-w-[32px] h-[32px]">
                              <Eye size={16} />
                            </Button>
                          </Link>
                          <ManageEditModal opportunity={opportunity} onUpdate={loadOpportunities}></ManageEditModal>
                          <Button isIconOnly size="sm" variant="light" className="bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md min-w-[32px] h-[32px]">
                            <TrashBin size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                }


                {/* Row 2 */}

                {/* <TableRow className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0">
                  <TableCell className="py-4 px-6 align-middle font-bold text-white">
                    <span className="line-clamp-1 truncate max-w-[150px]">UI/UX Designer</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle">
                    <Chip size="sm" className="font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 bg-blue-500/10 text-blue-400 border-blue-500/20">
                      Hybrid
                    </Chip>
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle">
                    <Chip size="sm" className="font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 bg-amber-500/10 text-amber-400 border-amber-500/20">
                      Part-time
                    </Chip>
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">30 May 2024</TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">8</TableCell>
                  <TableCell className="py-4 px-6 align-middle">
                    <div className="flex items-center gap-2">
                      <Button isIconOnly size="sm" variant="light" className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 rounded-md min-w-[32px] h-[32px]">
                        <Eye size={16} />
                      </Button>
                      <Button isIconOnly size="sm" variant="light" className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-md min-w-[32px] h-[32px]">
                        <Pencil size={16} />
                      </Button>
                      <Button isIconOnly size="sm" variant="light" className="bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md min-w-[32px] h-[32px]">
                        <TrashBin size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow> */}

                {/* Row 3 */}
                {/* <TableRow className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0">
                  <TableCell className="py-4 px-6 align-middle font-bold text-white">
                    <span className="line-clamp-1 truncate max-w-[150px]">Content Writer</span>
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle">
                    <Chip size="sm" className="font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                      Remote
                    </Chip>
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle">
                    <Chip size="sm" className="font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 bg-amber-500/10 text-amber-400 border-amber-500/20">
                      Part-time
                    </Chip>
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">20 May 2024</TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">6</TableCell>
                  <TableCell className="py-4 px-6 align-middle">
                    <div className="flex items-center gap-2">
                      <Button isIconOnly size="sm" variant="light" className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 rounded-md min-w-[32px] h-[32px]">
                        <Eye size={16} />
                      </Button>
                      <Button isIconOnly size="sm" variant="light" className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-md min-w-[32px] h-[32px]">
                        <Pencil size={16} />
                      </Button>
                      <Button isIconOnly size="sm" variant="light" className="bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md min-w-[32px] h-[32px]">
                        <TrashBin size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow> */}

              </TableBody>
            </TableContent>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default ManageOpportunitiesTable;