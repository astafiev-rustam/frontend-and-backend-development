import React, { useState } from 'react';
import { 
  ThemeProvider,
  createTheme,
  Container, 
  Typography, 
  Button, 
  Grid, 
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Tabs,
  Tab
} from '@mui/material';
import { Add, Dashboard as DashboardIcon, List as ListIcon } from '@mui/icons-material';
import SimpleTechCard from './SimpleTechCard';
import Dashboard from './Dashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`app-tabpanel-${index}`}
      aria-labelledby={`app-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение функциональных и классовых компонентов',
      category: 'frontend',
      status: 'in-progress',
      createdAt: new Date('2024-01-15').toISOString()
    },
    {
      id: 2,
      title: 'Material-UI',
      description: 'Освоение Material Design для React',
      category: 'ui-library',
      status: 'not-started',
      createdAt: new Date('2024-01-10').toISOString()
    },
    {
      id: 3,
      title: 'React Hooks',
      description: 'Использование useState, useEffect и других хуков',
      category: 'frontend',
      status: 'completed',
      createdAt: new Date('2024-01-05').toISOString()
    }
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleStatusChange = (techId, newStatus) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const addNewTechnology = () => {
    const newTech = {
      id: Date.now(),
      title: `Новая технология ${technologies.length + 1}`,
      description: 'Описание новой технологии для изучения',
      category: 'other',
      status: 'not-started',
      createdAt: new Date().toISOString()
    };
    setTechnologies(prev => [...prev, newTech]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🚀 Трекер технологий
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Навигация табами */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="app tabs">
          <Tab icon={<ListIcon />} label="Список технологий" />
          <Tab icon={<DashboardIcon />} label="Дашборд" />
        </Tabs>
      </Box>

      {/* Вкладка списка технологий */}
      <TabPanel value={tabValue} index={0}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Мои технологии
            </Typography>
            
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={addNewTechnology}
              size="large"
              sx={{ mb: 3 }}
            >
              Добавить технологию
            </Button>
          </Box>

          <Grid container spacing={3}>
            {technologies.map(technology => (
              <Grid item xs={12} sm={6} md={4} key={technology.id}>
                <SimpleTechCard
                  technology={technology}
                  onStatusChange={handleStatusChange}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </TabPanel>

      {/* Вкладка дашборда */}
      <TabPanel value={tabValue} index={1}>
        <Dashboard technologies={technologies} />
      </TabPanel>
    </ThemeProvider>
  );
}

export default App;