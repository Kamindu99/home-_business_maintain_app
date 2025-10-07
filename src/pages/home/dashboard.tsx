// material-ui

import { Grid } from '@mui/material';
import TeaMonthlyDashboard from './tea-collection';

// project import

// ==============================|| Dashboard ||============================== //

const Dashboard = () => (
  <>
    <TeaMonthlyDashboard/>
    <Grid id="g-mapdisplay" style={{ height: '500px', width: '100%', border: '0' }}>
      <iframe
        style={{ height: '100%', width: '100%', border: '0' }}
        frameBorder="0"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63405.98691630586!2d80.44183344996117!3d6.662095387111603!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3c13f05a868a5%3A0xe3d8cdc3ac4c6c92!2sWanigasinghe&#39;s%20Place!5e0!3m2!1sen!2sus!4v1733000997792!5m2!1sen!2sus"
      ></iframe>
    </Grid>
  </>
);

export default Dashboard;
