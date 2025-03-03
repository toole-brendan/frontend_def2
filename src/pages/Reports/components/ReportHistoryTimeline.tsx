import React from 'react';
import {
  Box,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import { BlockchainRecord } from '../types';
import { paperSx } from '../styles';
import { formatReportDate } from '../utils';

interface ReportHistoryTimelineProps {
  history: BlockchainRecord[];
}

const ReportHistoryTimeline: React.FC<ReportHistoryTimelineProps> = ({ history }) => {
  const theme = useTheme();
  
  return (
    <Paper sx={paperSx(theme)}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Report History Timeline
        </Typography>
        
        <Timeline position="alternate">
          {history.map((record, index) => (
            <TimelineItem key={record.transactionId}>
              <TimelineOppositeContent color="text.secondary">
                {formatReportDate(record.timestamp, 'MMM dd, yyyy')}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={
                  record.action === 'REPORT_CREATED' ? 'primary' :
                  record.action === 'REPORT_UPDATED' ? 'info' :
                  record.action === 'REPORT_APPROVED' ? 'success' : 'error'
                } />
                {index < history.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="body2" fontWeight="medium">
                  {record.action.replace('REPORT_', '').charAt(0) + 
                   record.action.replace('REPORT_', '').slice(1).toLowerCase()}
                </Typography>
                <Typography variant="caption">
                  By: {record.personnel.name}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
        
        {history.length === 0 && (
          <Typography variant="body2" sx={{ textAlign: 'center', py: 3 }}>
            No history available for this report.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default ReportHistoryTimeline; 