using Core.DTO;
using Core.Entities;
using Core.Interfaces;
using DocumentFormat.OpenXml.InkML;
using Microsoft.Extensions.Options;
using NLog;
using System;
using System.ServiceProcess;

namespace Infrastructure.Services
{
    public class WinService : IWinService
    {
        private static readonly ILogger _serviceLogger =
            LogManager.GetLogger("ServiceLog");
        private static readonly ILogger _serviceErrorLogger =
            LogManager.GetLogger("ServiceErrorLog");
        private readonly List<WindowSeriveConfiguration> _windowServices;
        public WinService(IOptions<List<WindowSeriveConfiguration>> options)
        {
            _windowServices = options.Value;
        }
        public async Task<List<WinServiceResponseDetailsDTO>> GetWinServiceStatus()
        {
            return await Task.Run(() =>
            {
                return _windowServices.Select(service =>
                {
                    if (service.Type == "Service")
                    {
                        try
                        {
                            using var sc = new ServiceController(service.Name);
                            sc.Refresh();

                            return new WinServiceResponseDetailsDTO
                            {
                                Name = service.Name,
                                Status = sc.Status.ToString(),
                                Type = "Window Service"
                            };
                        }
                        catch (Exception ex)
                        {
                            _serviceErrorLogger.Error(ex);
                            return new WinServiceResponseDetailsDTO
                            {
                                Name = service.Name,
                                Status = "Not Found / Error",
                                Type = "Window Service"
                            };
                        }
                    }
                    else if (service.Type == "API")
                    {
                        try
                        {
                            return new WinServiceResponseDetailsDTO
                            {
                                Name = service.Name,
                                Status = "Pending to Check",
                                Type = "API"
                            };
                        }
                        catch(Exception ex)
                        {
                            _serviceErrorLogger.Error(ex);
                            return new WinServiceResponseDetailsDTO
                            {
                                Name = service.Name,
                                Status = "Not Found / Error",
                                Type = "API"
                            };
                        }
                    }
                    else
                    {
                        return new WinServiceResponseDetailsDTO
                        {
                            Name = service.Name,
                            Status = "Not Found / Error",
                            Type = service.Type
                        };
                    }
                }).ToList();
            });
        }

        public Task<WinServiceResponseDetailsDTO> GetWinServiceStatus(WinServiceRequestDTO winServiceRequestDTO)
        {
            throw new NotImplementedException();
        }

        public async Task<WinServiceResponseDetailsDTO> StartWinService(WinServiceRequestDTO request, GetUserDetailsDTO userDetailsDTO)
        {
            try
            {
                _serviceLogger.Info(userDetailsDTO.Name + " with User Name: " + userDetailsDTO.UserName + " has made request to start the service with Name:" + request.Name);
                using var sc = new ServiceController(request.Name);

                sc.Refresh();

                if (sc.Status == ServiceControllerStatus.Running)
                {
                    return new WinServiceResponseDetailsDTO
                    {
                        Name = request.Name,
                        Status = sc.Status.ToString(),
                        Type = "Window Service"
                    };
                }

                sc.Start();
                sc.WaitForStatus(ServiceControllerStatus.Running, TimeSpan.FromSeconds(30));

                return new WinServiceResponseDetailsDTO
                {
                    Name = request.Name,
                    Status = ServiceControllerStatus.Running.ToString(),
                    Type = "Window Service"
                };
            }
            catch (Exception ex)
            {
                _serviceErrorLogger.Error(ex);
                return new WinServiceResponseDetailsDTO
                {
                    Name = request.Name,
                    Status = "Error",
                    Type = "Window Service"
                };
            }
        }

        public async Task<WinServiceResponseDetailsDTO> StopWinService(WinServiceRequestDTO request, GetUserDetailsDTO userDetailsDTO)
        {
            try
            {
                _serviceLogger.Info(userDetailsDTO.Name + " with User Name: " + userDetailsDTO.UserName + " has made request to stop the service with Name:" + request.Name);
                using var sc = new ServiceController(request.Name);

                sc.Refresh();

                if (sc.Status == ServiceControllerStatus.Stopped)
                {
                    return new WinServiceResponseDetailsDTO
                    {
                        Name = request.Name,
                        Status = sc.Status.ToString(),
                        Type = "Window Service"
                        //Message = "Service is already stopped."
                    };
                }

                sc.Stop();
                sc.WaitForStatus(ServiceControllerStatus.Stopped, TimeSpan.FromSeconds(30));

                return new WinServiceResponseDetailsDTO
                {
                    Name = request.Name,
                    Status = ServiceControllerStatus.Stopped.ToString(),
                    Type = "Window Service"
                    //Message = "Service stopped successfully."
                };
            }
            catch (Exception ex)
            {
                _serviceErrorLogger.Error(ex);
                return new WinServiceResponseDetailsDTO
                {
                    Name = request.Name,
                    Status = "Error",
                    Type = "Window Service"
                    //Message = ex.Message
                };
            }
        }
    }
}
