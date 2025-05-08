import React from 'react';
import { render, screen } from '@testing-library/react';
import SidebarAlert from '../components/SideBar';
import * as EventsContext from '../context/EventsContext';

describe('SidebarAlert', () => {
  test('muestra mensaje cuando no hay eventos', () => {
    // Mockear useEvents para devolver un array vacío
    vi.spyOn(EventsContext, 'useEvents').mockReturnValue({ events: [] });

    render(<SidebarAlert />);

    expect(screen.getByText('Eventos')).toBeInTheDocument();
    expect(screen.getByText('No hay eventos registrados')).toBeInTheDocument();
  });

  test('muestra eventos cuando existen', () => {
    const mockEvents = [
      { id: 1, title: 'Evento 1', date: '2025-05-08', startTime: '10:00', endTime: '11:00', desc: 'Desc 1', priority: 'Alta' },
      { id: 2, title: 'Evento 2', date: '2025-05-09', startTime: '12:00', endTime: '13:00', desc: 'Desc 2', priority: 'Media' },
    ];

    // Mockear useEvents para devolver los eventos de prueba
    vi.spyOn(EventsContext, 'useEvents').mockReturnValue({ events: mockEvents });

    render(<SidebarAlert />);

    expect(screen.getByText('Evento 1')).toBeInTheDocument();
    expect(screen.getByText('Evento 2')).toBeInTheDocument();
    expect(screen.queryByText('No hay eventos registrados')).not.toBeInTheDocument();
  });

  test('verifica el contenido de los eventos', () => {
    const mockEvents = [
      { id: 1, title: 'Evento Alta', date: '2025-05-08', startTime: '10:00', endTime: '11:00', desc: 'Desc Alta', priority: 'Alta' },
      { id: 2, title: 'Evento Media', date: '2025-05-09', startTime: '12:00', endTime: '13:00', desc: 'Desc Media', priority: 'Media' },
      { id: 3, title: 'Evento Baja', date: '2025-05-10', startTime: '14:00', endTime: '15:00', desc: 'Desc Baja', priority: 'Baja' },
    ];

    // Mockear useEvents para devolver los eventos de prueba
    vi.spyOn(EventsContext, 'useEvents').mockReturnValue({ events: mockEvents });

    render(<SidebarAlert />);

    // Verificar que los títulos de los eventos estén en el documento
    expect(screen.getByText('Evento Alta')).toBeInTheDocument();
    expect(screen.getByText('Evento Media')).toBeInTheDocument();
    expect(screen.getByText('Evento Baja')).toBeInTheDocument();

    // Verificar que las fechas de los eventos estén en el documento
    expect(screen.getByText(/2025-05-08/)).toBeInTheDocument();
  expect(screen.getByText(/2025-05-09/)).toBeInTheDocument();
  expect(screen.getByText(/2025-05-10/)).toBeInTheDocument();

    // Verificar que los horarios estén en el documento
    expect(screen.getByText(/10:00-11:00/)).toBeInTheDocument();
    expect(screen.getByText(/12:00-13:00/)).toBeInTheDocument();
    expect(screen.getByText(/14:00-15:00/)).toBeInTheDocument();

    // Verificar que las descripciones estén en el documento
    expect(screen.getByText('Desc Alta')).toBeInTheDocument();
    expect(screen.getByText('Desc Media')).toBeInTheDocument();
    expect(screen.getByText('Desc Baja')).toBeInTheDocument();
  });
});
